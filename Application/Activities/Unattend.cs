using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Unattend
    {

        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }


        public class Commandvalidator : AbstractValidator<Command>
        {
            public Commandvalidator()
            {
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
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "activity not found" });

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUser());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(x => x.AppUser.Id == user.Id && x.ActivityId == activity.Id);

                if (attendance == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Attendance = "attendance not found" });

                if (attendance.IsHost)
                    throw new RestException(HttpStatusCode.BadRequest, new { Attendance = "host attendant not allowed to be removed" });
                
                _context.UserActivities.Remove(attendance);

                bool success = await _context.SaveChangesAsync() > 0;

                if (!success)
                    throw new RestException(HttpStatusCode.InternalServerError, new { Error = "Problem saving changes" });

                return Unit.Value;
            }
        }





    }
}
