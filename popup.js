function getEventInfo(userId, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.github.com/users/${userId}/events/public`, true);
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      response.forEach(event => {
        if(event.payload && event.payload.commits) {
          var emailFound = false;

          event.payload.commits.forEach(commit => {
            if(commit.author && commit.author.email) {
              const email = commit.author.email;
              if(email) {
                callback({ error: false, email });
                emailFound = true;
                return;
              }
            }
          });

          if(!emailFound) { callback({ error: true }); }
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const queryInfo = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(queryInfo, tabs => {
    const tabUrl = tabs[0].url;
    const githubId = tabUrl.split('/')[3];

    getEventInfo(githubId, response => {
      var div = document.getElementById('email');
      let html;

      if(response.error) {
        html = 'No email found.'
      } else {
        html = `Email: ${response.email}`;
      }

      div.innerHTML = html;
    });
  });
});
