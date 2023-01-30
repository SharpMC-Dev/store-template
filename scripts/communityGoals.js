const CGEndpoint = 'http://localhost:9901/store/communitygoals';
var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

let goalList = $('.community-goals');

let html = `<div class="donation-goal-card card">
              <span class="card-title">Donation Goal</span>
              <span id="community-goal-title" class="card-subtitle" style="text-transform: none; font-weight: 100">Boss Battle</span>
              <div class="goal-progress">
                <div class="progress-item1 progress-item complete"></div>
                <div class="progress-item2 progress-item complete"></div>
                <div class="progress-item3 progress-item complete"></div>
                <div class="progress-item4 progress-item complete"></div>
                <div class="progress-item5 progress-item complete"></div>
                <div class="progress-item6 progress-item complete"></div>
                <div class="progress-item7 progress-item complete"></div>
                <div class="progress-item8 progress-item complete"></div>
                <div class="progress-item9 progress-item complete"></div>
                <div class="progress-item10 progress-item complete"></div>
                <div class="progress-item11 progress-item"></div>
                <div class="progress-item12 progress-item"></div>
                <div class="progress-item13 progress-item"></div>
                <div class="progress-item14 progress-item"></div>
                <div class="progress-item15 progress-item"></div>
                <div class="progress-item16 progress-item"></div>
                <div class="progress-item17 progress-item"></div>
                <div class="progress-item18 progress-item"></div>
                <div class="progress-item19 progress-item"></div>
                <div class="progress-item20 progress-item"></div>
              </div>
              <span class="card-footer">50% &bull; $350 / $700</span>
            </div>`;

function getBars(percent) {
  let bars = 20;
  let res = { full: 0, empty: 0 };

  res.full = ~~((percent / 100) * bars);
  res.empty = bars - res.full;

  return res;
}

fetch(CGEndpoint, requestOptions).then(res =>
  res.text().then(response => {
    response = JSON.parse(response);
    let goals = response.communityGoals;

    goals.forEach(goal => {
      let { goal: goalAmount, current: currentAmount, percentCompleted } = goal.progress;
      let bars = getBars(percentCompleted);
      let fullBars = `<div class="progress-item complete"></div>`.repeat(bars.full);
      let emptyBars = `<div class="progress-item"></div>`.repeat(bars.empty);

      goalList.append(`<div class="donation-goal-card card">
              <span class="card-title">Community Goal</span>
              <span id="community-goal-title" class="card-subtitle" style="text-transform: none; font-weight: 100">${goal.name}</span>
              <div class="goal-progress">
                ${fullBars}
                ${emptyBars}
              </div>
              <span class="card-footer">${percentCompleted}% Completed<span style="letter-spacing:5px"> &bull; </span>$${currentAmount} / $${goalAmount}</span>
            </div>`);
    });
  })
);
