using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace TheWorld.Models
{
    public class WorldRepository : IWorldRepository
    {
        private readonly ILogger<WorldRepository> _logger;
        private readonly WorldContext _context;

        public WorldRepository(WorldContext context, ILogger<WorldRepository> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger;
        }

        public void AddTrip(Trip trip)
        {
            _context.Add(trip);
        }

        public void AddStop(string tripName, Stop newStop, string userName)
        {
            var trip = GetUserTripByName(tripName, userName);

            if (trip != null)
            {
                // place new stop at end by Order
                var n = trip.Stops?.OrderByDescending(i => i.Order).FirstOrDefault()?.Order ?? 0;
                newStop.Order = n + 1;

                trip.Stops.Add(newStop);
                _context.Stops.Add(newStop);
            }
        }

        public IEnumerable<Trip> GetAllTrips()
        {
            _logger?.LogInformation("Getting All Trips from the database");

            return _context.Trips.ToList();
        }

        public IEnumerable<Trip> GetTripsByUsername(string userName)
        {
            _logger?.LogInformation($"Getting All Trips for {userName}");

            return _context.Trips
                .Include(t => t.Stops)
                .Where(t => t.UserName == userName)
                .ToList();
        }

        public Trip GetTripByName(string tripName)
        {
            return _context.Trips
                .Include(t => t.Stops)
                .FirstOrDefault(t => t.Name == tripName);
        }

        public Trip GetUserTripByName(string tripName, string userName)
        {
            return _context.Trips
                .Include(t => t.Stops)
                .FirstOrDefault(t => t.Name == tripName && t.UserName == userName);
            // TODO: need to ensure we do not add duplicate trip names for a user - later
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
