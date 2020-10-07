using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class UserActivity
    {
        // activity
        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; }

        // appUser
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}
