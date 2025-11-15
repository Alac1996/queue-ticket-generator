using Microsoft.AspNetCore.Mvc;
using QueueApi.Models;

namespace QueueApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QueueController : ControllerBase
    {
        private static readonly object _lock = new();

        private static QueueState _state = new()
        {
            Prefix = 'A',
            Number = 0
        };

        [HttpGet("current")]
        public ActionResult<string> GetCurrent()
        {
            lock (_lock)
            {
                if (_state.Prefix == '0')
                {
                    return Ok("00");
                }

                return Ok($"{_state.Prefix}{_state.Number}");
            }
        }

        [HttpPost("next")]
        public ActionResult<string> Next()
        {
            lock (_lock)
            {
                if (_state.Prefix == '0' && _state.Number == 0)
                {
                    _state.Prefix = 'A';
                    _state.Number = 0;
                }
                else if (_state.Number < 9)
                {
                    _state.Number++;
                }
                else
                {
                    _state.Number = 0;
                    _state.Prefix = _state.Prefix == 'Z' ? 'A'
                        : (char)(_state.Prefix + 1);
                }

                var result = $"{_state.Prefix}{_state.Number}";
                return Ok(result);
            }
        }

        [HttpPost("reset")]
        public ActionResult<String> Reset()
        {
            lock (_lock)
            {
                _state.Prefix = '0';
                _state.Number = 0;
                return Ok("00");
            }
        }
    }
}
