'use strict';

(function($, org, evt, undefined){

    var reposContainer  = document.getElementById('repos'),
        issuesContainer = document.getElementById('issues');

    /*
        ============
        REPOSITORIES
        ============
    */
    function _loadRepos(){

        // ajax request
            // build url from org name
            // success
                // run result through hbs templ
                // append resulting html to repo container
                // let app know we've loaded some repos

    }


    /*
        ======
        ISSUES
        ======
    */
    function _loadIssues(repos){

        // loop over each repo
            // grab it's name and html_url
            // construct our issues url (filter=all)
            // ajax request
                // on success
                    // make sure issues exist
                    // set up hbs context
                        // name, url (html), issues (map to format issue)
                    // run context through hbs 'issues' templ
                    // append resulting html to container
                    // let rest of app know we've rendered some issues

    }

    function _formatIssue(issue){
        issue.date = _formatDate(issue.created_at);
        return issue;
    }

    /*
        ============
        CONTROL FLOW
        ============
    */
    _loadRepos();
    evt.on('reposLoaded', _loadIssues);


    /*
        ================
        HELPER FUNCTIONS
        ================
    */
    function _pad(str){
        return str.length == 2 ? str : '0' + str;
    }

    function _formatDate(str){
        var date = new Date(str);

        var year  = date.getFullYear(),
            month = _pad((date.getMonth() + 1).toString()),
            day   = _pad(date.getDate().toString());

        return [month, day, year].join('/');
    }


})(jQuery, 'FreeCodeCampOKC', window.EVT);
