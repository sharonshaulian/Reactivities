using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }

        }


        public class Handelr : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handelr(DataContext context)
            {
                _context = context;
            }



            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var editActivity = await _context.Activities.FindAsync(request.Id);

                if (editActivity == null)
                    throw new Exception("Could not find activity");

                editActivity.Title = request.Title ?? editActivity.Title;
                editActivity.Description = request.Description ?? editActivity.Description;
                editActivity.Category = request.Category ?? editActivity.Category;
                editActivity.Date = request.Date ?? editActivity.Date;
                editActivity.City = request.City ?? editActivity.City;
                editActivity.Venue = request.Venue ?? editActivity.Venue;

                _context.Activities.Update(editActivity);
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                    return Unit.Value;
                else
                    throw new Exception("Problem saving changes");
            }
        }





    }
}
