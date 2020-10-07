using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest {

            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }

        }


        public class Commandvalidator : AbstractValidator<Command>
        {
            public Commandvalidator()
            {
                RuleFor(c => c.Title).NotEmpty();
                RuleFor(c => c.Description).NotEmpty();
                RuleFor(c => c.Category).NotEmpty();
                RuleFor(c => c.Date).NotEmpty();
                RuleFor(c => c.City).NotEmpty();
                RuleFor(c => c.Venue).NotEmpty();
            }
        }



        public class Handelr : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handelr(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }


            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //
                var newActivity = new Activity()
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                
                _context.Activities.Add(newActivity);

                //
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUser());
                var atendee = new UserActivity()
                {
                    AppUser = user,
                    Activity = newActivity,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                _context.UserActivities.Add(atendee);

                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                    return Unit.Value;
                else
                    throw new Exception("Problem saving changes");
            }
        }



    }
}
