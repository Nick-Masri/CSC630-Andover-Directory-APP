# PA Directory

A searchable, filterable directory of Phillips Academy students. Not meant to actually be used—developed for a CSC630 class.

## Instructions

This app, though it is not packaged yet to be downloaded, can be used with [Expo](https://expo.io/tools).

```
git clone https://github.com/Nick-Masri/CSC630-Andover-Directory-APP.git
cd CSC630-Andover-Directory-APP
npm install
cd frontend
expo start
```

Then, follow the instructions which open up in the browser and connect with the mobile Expo app.

## Future To-Do List

* Better full-text search. As of now, searching "Jeffrey Shen" will not return any results, though searching "Shen Jeffrey" will.
* Email verification
* Storing sessions on the mobile app so the user does not need to repeately log-in.
* API verification—requiring certain credentials to access the API (so the data is not leaked to non-PA members)

## Table of Contents

This project contains two components: a backend and a frontend, each contained in their respective folders.

### Backend

The backend is simply an API to provide filterable or searchable access to Phillips Academy students. It is available at [csc630-project-2.herokuapp.com/people](https://csc630-project-2.herokuapp.com/people). **The API is paginated**. Parameters for the API:

* `clusters`: a comma-separated list of clusters (i.e. PKN,WQS)
* `grades`: a comma-separated list of grades (i.e. Junior,Senior)
* `dorms`: a comma-separated list of dorms
* `entered`: a comma-separated list of what year a student entered in (i.e. 2015,2016)
* `search`: a string to search to full-text search the database by. As of now, incomplete
* `page`: an integer, default 1
