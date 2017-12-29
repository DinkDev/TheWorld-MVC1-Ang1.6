using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace TheWorld.Controllers.Api
{
    [Route("api/mapdata")]
    [Authorize]
    public class MapDataController : Controller
    {
        private readonly IConfigurationRoot _config;

        public MapDataController(IConfigurationRoot config)
        {
            _config = config;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var apiKey = _config["Keys:BingKey"];

                return Content(apiKey, "text/plain");
            }
            catch (Exception ex)
            {
                // TODO: logging
                //_logger?.LogError($"Failed to get all trips {ex}");

                return BadRequest("Error occurred");
            }
        }
    }
}