const socket = io();

const App = {
  timer: 0,
  seconds: 300,
  minutes: 5,
};

const WS_ACTIONS = {
  START: 'bjj:start',
  RESTART: 'bjj:restart',
  SCORE: 'bjj:score',
  NAME: 'bjj:name',
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
  $('#fighter-1-name').keyup(App.fightername1);
  $('#fighter-2-name').keyup(App.fightername2);
};

App.emit = data => {
  const { value, oper, fighter, type } = data;
  socket.emit(WS_ACTIONS.SCORE, {
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
  socket.emit(WS_ACTIONS.START, { start: true });
};

App.restart = () => {
  socket.emit(WS_ACTIONS.RESTART, { restart: true });
};

// sockets
socket.on(WS_ACTIONS.SCORE, data => {
  let val;
  let movScore = 0;
  if (data.type === 'time') {
    App.seconds = data.value * 60;
    App.seconds = App.seconds < 60 ? 60 : App.seconds;
    App.minutes = data.value;
    App.renderTimer(App.seconds);
  } else {
    val = parseInt($(`.fighter-${data.fighter}-${data.type}`).text());
    if ($(`.fighter-${data.fighter}-${data.value}-points`).length > 0) {
      movScore = parseInt($(`.fighter-${data.fighter}-${data.value}-points > .points-score`).text());
    }
    if (data.oper === 'add') {
      val += data.value;
      movScore += data.value;
    } else {
      val -= data.value;
      movScore -= data.value;
    }
    $(`.fighter-${data.fighter}-${data.type}`).text(val);
    if ($(`.fighter-${data.fighter}-${data.value}-points`).length > 0) {
      $(`.fighter-${data.fighter}-${data.value}-points > .points-score`).text(movScore);
    }
  }
});

socket.on(WS_ACTIONS.START, data => {
  if (data.start === true) {
    if (App.timer !== 0) {
      App.stopTimer();
      if ($(`.fighter-1-4-points`).length > 0) {
        $('#start').attr('class', '');
        $('#start').addClass('fas fa-play-circle');
      } else {
        $('#start').text('Iniciar');
      }
    } else {
      App.renderTimer(App.seconds);
      App.startTimer();
      if ($(`.fighter-1-4-points`).length > 0) {
        $('#start').attr('class', '');
        $('#start').addClass('fas fa-pause-circle');
      } else {
        $('#start').text('Pausa');
      }
    }
  }
});

socket.on(WS_ACTIONS.RESTART, data => {
  if (data.restart === true) {
    if ($('.fighter-1-4-points').length > 0) {
      $('#start').attr('class', '');
      $('#start').addClass('fas fa-play-circle');
      $('.points-score').text('0');
    } else {
      $('#start').text('Iniciar');
    }
    App.stopTimer();
    App.seconds = App.minutes * 60;
    App.renderTimer(App.seconds);
    $('.fighter-1-score').text('0');
    $('.fighter-2-score').text('0');
    $('.fighter-1-adv').text('0');
    $('.fighter-1-penal').text('0');
    $('.fighter-2-adv').text('0');
    $('.fighter-2-penal').text('0');
    $('#fighter-1-name').val('');
    $('#fighter-1-name').val('');
  }
});

socket.on(WS_ACTIONS.NAME, data => {
  $(`#fighter-${data.fighter}-name`).val(data.value);
});

// fighter name edit
App.fightername1 = () => {
  socket.emit(WS_ACTIONS.NAME, {
    value: $('#fighter-1-name').val(),
    fighter: 1,
  });
};

App.fightername2 = () => {
  socket.emit(WS_ACTIONS.NAME, {
    value: $('#fighter-2-name').val(),
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
