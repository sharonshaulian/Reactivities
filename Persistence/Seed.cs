﻿using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Activities.Any())
            {
                List<Activity> activities = new List<Activity>()
                {
                    new Activity()
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub"
                    },
                    new Activity()
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "Drinks",
                        City = "Paris",
                        Venue = "Louvre"
                    },
                    new Activity()
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 months in future",
                        Category = "Culture",
                        City = "Amsterdam",
                        Venue = "Natural History Museum"
                    },
                    new Activity()
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "Culture",
                        City = "London",
                        Venue = "Natural History Museum"
                    },
                    new Activity()
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Another pub"
                    },
                    new Activity()
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "Culture",
                        City = "London",
                        Venue = "Yet another pub"
                    }
                };


                context.AddRange(activities);
                context.SaveChanges();

            }
        }
    }
}