const socket = io();

const App = {
  timer: 0,
  seconds: 300,
  minutes: 5,
};

/*
* Init App
*/
App.init = () => {
  $('.timer').html(App.renderTimer(App.seconds));
  $('#start').click(App.start);
  $('#restart').click(App.restart);
  $('#add4f1').click(App.add4f1);
  $('#add3f1').click(App.add3f1);
  $('#add2f1').click(App.add2f1);
  $('#addadvf1').click(App.addadvf1);
  $('#addpenalf1').click(App.addpenalf1);
  $('#sub4f1').click(App.sub4f1);
  $('#sub3f1').click(App.sub3f1);
  $('#sub2f1').click(App.sub2f1);
  $('#subadvf1').click(App.subadvf1);
  $('#subpenalf1').click(App.subpenalf1);
  $('#add4f2').click(App.add4f2);
  $('#add3f2').click(App.add3f2);
  $('#add2f2').click(App.add2f2);
  $('#addadvf2').click(App.addadvf2);
  $('#addpenalf2').click(App.addpenalf2);
  $('#sub4f2').click(App.sub4f2);
  $('#sub3f2').click(App.sub3f2);
  $('#sub2f2').click(App.sub2f2);
  $('#subadvf2').click(App.subadvf2);
  $('#subpenalf2').click(App.subpenalf2);
  $('#addmin').click(App.addmin);
  $('#submin').click(App.submin);
  $('#fighter-name-1').keyup(App.fightername1);
  $('#fighter-name-2').keyup(App.fightername2);
};

App.emit = data => {
  const { value, oper, fighter, type } = data;
  socket.emit('bjj:score', {
    value,
    oper,
    fighter,
    type,
  });
}

App.renderTimer = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const secondsStr = seconds.toString().padStart(2, '0');
  $('.timer').html(`${minutes}:${secondsStr}`);
};

App.startTimer = () => {
  if (App.timer === 0 && App.seconds > 0) {
    App.timer = setInterval(App.countDown, 1000);
  }
};

App.countDown = () => {
  // Remove one second, set state so a re-render happens.
  const seconds = App.seconds - 1;
  App.seconds = seconds;
  $('.timer').html(App.renderTimer(App.seconds));

  // Check if we're at zero.
  if (seconds === 0) {
    App.stopTimer();
  }
}

App.stopTimer = () => {
  clearInterval(App.timer);
  App.timer = 0;
}

App.start = () => {
  socket.emit('bjj:start', { start: true });
};

App.restart = () => {
  socket.emit('bjj:restart', { restart: true });
};

// sockets
socket.on('bjj:score', data => {
  let val;
  if (data.type === 'time') {
    App.seconds = data.value * 60;
    App.seconds = App.seconds < 60 ? 60 : App.seconds;
    App.minutes = data.value;
    App.renderTimer(App.seconds);
  } else {
    val = parseInt($(`.fighter-${data.type}-${data.fighter}`).text());
    if (data.oper === 'add') {
      val += data.value;
    } else {
      val -= data.value;
    }
    $(`.fighter-${data.type}-${data.fighter}`).text(val);
  }
});

socket.on('bjj:start', data => {
  if (data.start === true) {
    if (App.timer !== 0) {
      App.stopTimer();
    } else {
      App.renderTimer(App.seconds);
      App.startTimer();
    }
  }
});

socket.on('bjj:restart', data => {
  if (data.restart === true) {
    App.stopTimer();
    App.seconds = App.minutes * 60;
    App.renderTimer(App.seconds);
    $('.fighter-score-1').text('0');
    $('.fighter-score-2').text('0');
    $('.fighter-adv-1').text('0');
    $('.fighter-penal-1').text('0');
    $('.fighter-adv-2').text('0');
    $('.fighter-penal-2').text('0');
    $('#fighter-name-1').val('');
    $('#fighter-name-2').val('');
  }
});

socket.on('bjj:name', data => {
  $(`#fighter-name-${data.fighter}`).val(data.value);
});

// fighter name edit
App.fightername1 = () => {
  socket.emit('bjj:name', {
    value: $('#fighter-name-1').val(),
    fighter: 1,
  });
};

App.fightername2 = () => {
  socket.emit('bjj:name', {
    value: $('#fighter-name-2').val(),
    fighter: 2,
  });
};

// fighters score actions
App.add4f1 = () => {
  App.emit({
    value: 4,
    oper: "add",
    fighter: "1",
    type: "score",
  });
};

App.add3f1 = () => {
  App.emit({
    value: 3,
    oper: "add",
    fighter: "1",
    type: "score",
  });
};

App.add2f1 = () => {
  App.emit({
    value: 2,
    oper: "add",
    fighter: "1",
    type: "score",
  });
};

App.addpenalf1 = () => {
  App.emit({
    value: 1,
    oper: "add",
    fighter: "1",
    type: "penal",
  });
};

App.addadvf1 = () => {
  App.emit({
    value: 1,
    oper: "add",
    fighter: "1",
    type: "adv",
  });
};

App.sub4f1 = () => {
  App.emit({
    value: 4,
    oper: "sub",
    fighter: "1",
    type: "score",
  });
};

App.sub3f1 = () => {
  App.emit({
    value: 3,
    oper: "sub",
    fighter: "1",
    type: "score",
  });
};

App.sub2f1 = () => {
  App.emit({
    value: 2,
    oper: "sub",
    fighter: "1",
    type: "score",
  });
};

App.subpenalf1 = () => {
  App.emit({
    value: 1,
    oper: "sub",
    fighter: "1",
    type: "penal",
  });
};

App.subadvf1 = () => {
  App.emit({
    value: 1,
    oper: "sub",
    fighter: "1",
    type: "adv",
  });
};

App.add4f2 = () => {
  App.emit({
    value: 4,
    oper: "add",
    fighter: "2",
    type: "score",
  });
};

App.add3f2 = () => {
  App.emit({
    value: 3,
    oper: "add",
    fighter: "2",
    type: "score",
  });
};

App.add2f2 = () => {
  App.emit({
    value: 2,
    oper: "add",
    fighter: "2",
    type: "score",
  });
};

App.addpenalf2 = () => {
  App.emit({
    value: 1,
    oper: "add",
    fighter: "2",
    type: "penal",
  });
};

App.addadvf2 = () => {
  App.emit({
    value: 1,
    oper: "add",
    fighter: "2",
    type: "adv",
  });
};

App.sub4f2 = () => {
  App.emit({
    value: 4,
    oper: "sub",
    fighter: "2",
    type: "score",
  });
};

App.sub3f2 = () => {
  App.emit({
    value: 3,
    oper: "sub",
    fighter: "2",
    type: "score",
  });
};

App.sub2f2 = () => {
  App.emit({
    value: 2,
    oper: "sub",
    fighter: "2",
    type: "score",
  });
};

App.subpenalf2 = () => {
  App.emit({
    value: 1,
    oper: "sub",
    fighter: "2",
    type: "penal",
  });
};

App.subadvf2 = () => {
  App.emit({
    value: 1,
    oper: "sub",
    fighter: "2",
    type: "adv",
  });
};

App.addmin = () => {
  App.emit({
    value: App.minutes + 1,
    oper: "add",
    type: "time",
  });
};

App.submin = () => {
  App.minutes = App.minutes < 1 ? 1 : App.minutes - 1;
  App.emit({
    value: App.minutes,
    oper: "sub",
    type: "time",
  });
};

$(() => App.init());
