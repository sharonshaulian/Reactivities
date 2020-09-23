using Application.Errors;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var deleteActivity = await _context.Activities.FindAsync(request.Id);

                if (deleteActivity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });

                _context.Activities.Remove(deleteActivity);
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                    return Unit.Value;
                else
                    throw new Exception("Problem saving changes");
            }
        }
    }
}
