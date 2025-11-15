using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using QueueApi.Controllers;

namespace QueueApi.Tests
{
    public class QueueControllerTests
    {
        private readonly QueueController _controller;

        public QueueControllerTests()
        {
            _controller = new QueueController();
            _ = _controller.Reset();
        }

        [Fact]
        public void GetCurrent_ครั้งแรกควรได้_00()
        {
            var result = _controller.GetCurrent();

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var value = Assert.IsType<string>(ok.Value);

            Assert.Equal("00", value);
        }

        [Fact]
        public void Next_หลังจากResetควรได้หมายเลขแรกเช่น_A0()
        {
            var result = _controller.Next();

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var value = Assert.IsType<string>(ok.Value);

            Assert.Equal("A0", value);
        }

        [Fact]
        public void Next_แล้วGetCurrent_ควรได้หมายเลขเดียวกัน()
        {
            var nextResult = _controller.Next();
            var okNext = Assert.IsType<OkObjectResult>(nextResult.Result);
            var nextValue = Assert.IsType<string>(okNext.Value);

            var currentResult = _controller.GetCurrent();
            var okCurrent = Assert.IsType<OkObjectResult>(currentResult.Result);
            var currentValue = Assert.IsType<string>(okCurrent.Value);

            Assert.Equal(nextValue, currentValue);
        }

        [Fact]
        public void Next_หลายครั้งแล้วReset_ควรกลับมาเป็น_00()
        {
            _controller.Next();
            _controller.Next();
            _controller.Next();

            var resetResult = _controller.Reset();
            var okReset = Assert.IsType<OkObjectResult>(resetResult.Result);
            var resetValue = Assert.IsType<string>(okReset.Value);

            Assert.Equal("00", resetValue);

            var current = _controller.GetCurrent();
            var okCurrent = Assert.IsType<OkObjectResult>(current.Result);
            var currentValue = Assert.IsType<string>(okCurrent.Value);

            Assert.Equal("00", currentValue);
        }
    }
}
