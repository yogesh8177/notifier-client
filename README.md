# Angular notifier client

Visit: [notifier.ysoftapps.in](http://notifier.ysoftapps.in) 

1. ```npm install -g angular-cli```
2. ```ng init --source-dir src``` (Do not override *.ts files)
3. ```npm install @types/socket.io-client --save```
4. ```ng build --prod```

**Use webanimations.js for cross platform animation effects!**

## Working of App

* Top right heading of the notification panel turns dark green when connected to server, turns red otherwise!
* If you submit job and wait for 3 seconds before expanding notification panel, then you can see count of unseen notifications!
* Once you expand the notification panel, unseen notification count becomes 0 and becomes invisible!
* Click on notification panel to expand and/or collapse it!
* Each job contains current time stamp as its ID
* Color codes for notifications: **Orange:** job submitted and pending for completion, **Green:** job completed successfully, **Red:** job failed due to web app refresh!
* Note that only currently submitted jobs can be stored in history, i.e after submitting a job or jobs for current session, if web app is refreshed, previous notifications are in history (LocalStorage)!
* If a job is submitted and web page is refreshed before job completes, then after refresh that job notification will turn red denoting that job failed!
* LocalStorage is used instead of session for old notification history!
