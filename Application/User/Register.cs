using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class Register
    {

        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }


        }


        public class Commandvalidator : AbstractValidator<Command>
        {
            public Commandvalidator()
            {
                RuleFor(c => c.DisplayName).NotEmpty();
                RuleFor(c => c.UserName).NotEmpty();
                RuleFor(c => c.Email).NotEmpty().EmailAddress();
                RuleFor(c => c.Password).Password();
            }
        }



        public class Handelr : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handelr(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }


            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {

                if (await _context.Users.AnyAsync(u => u.Email.ToLower() == request.Email.ToLower()))
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "email already taken" });

                if (await _context.Users.AnyAsync(u => u.UserName.ToLower() == request.UserName.ToLower()))
                    throw new RestException(HttpStatusCode.BadRequest, new { Username = "username already taken" });

                var user = new AppUser()
                {
                    DisplayName = request.DisplayName,
                    UserName = request.UserName,
                    Email = request.Email,
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    var userResult = new User()
                    {
                        DisplayName = user.DisplayName,
                        Username = user.UserName,
                        Token = _jwtGenerator.CreateToken(user),
                        Image = null
                    };

                    return userResult;
                }

                throw new Exception("Problem saving changes");
            }
        }


    


    }
}
