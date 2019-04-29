# PA Directory

A searchable, filterable directory of Phillips Academy students. Not meant to actually be used—developed for a CSC630 class.

## Table of Contents

This project contains two components: a backend and a frontend, each contained in their respective folders.

### Backend

The backend is simply an API to provide filterable or searchable access to Phillips Academy students. It is available at [csc630-project-2.herokuapp.com/people](https://csc630-project-2.herokuapp.com/people). **The API is paginated**. Parameters for the API:

* `clusters`: a comma-separated list of clusters (i.e. PKN,WQS)
* `grades`: a comma-separated list of grades (i.e. Junior,Senior)
* `dorms`: a comma-separated list of dorms
* `entered`: a comma-separated list of what year a student entered in (i.e. 2015,2016)
* `query`: a string to search to full-text search the database by. As of now, incomplete
* `page`: an integer, default 1 
