// 今日の日付をクリックしてくれる
(function () {
  const button = document.querySelectorAll(".day");
  const todayButton = Array.from(button).find((button) => {
    return button.textContent === new Date().getDate().toString();
  });

  if (!todayButton) return;
})();

// 8:30始業、17:00終業、リモートワークを選択（普段は9時始業だが、ときどき8:30始業の日がある）
(function () {
  const startTime = document.querySelector("input[name='StartTime']");
  startTime.value = "0830";
  const endTime = document.querySelector("input[name='EndTime']");
  endTime.value = "1700";

  const selectElement = document.querySelector("select[name='TimecardCause']");
  const options = selectElement?.children;
  const remoteWorkOption = Array.from(options).find((option) => {
    return option.textContent === "リモートワーク";
  });

  if (remoteWorkOption) remoteWorkOption.selected = true;
})();
