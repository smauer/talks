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

        $.ajax(
            {
                url: 'https://api.github.com/orgs/' + org + '/repos',
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    reposContainer.innerHTML = Handlebars.templates.repo({repos: data});

                    window.repos = data;
                    evt.emit('reposLoaded', data);

                },
                error: function(xhr, status, err){

                }
            }
        );
    }


    /*
        ======
        ISSUES
        ======
    */
    function _loadIssues(repos){

        repos.forEach(function(repo){
            var name     = repo.name,
                repo_url = repo.html_url;

            var url = 'https://api.github.com/repos/' + org + '/' + name + '/issues?filter=all';

            $.ajax(
                {
                    url: url,
                    method: 'GET',
                    dataType: 'json',
                    success: function(issues){
                        if(issues.length){

                            var ctx = {
                                name: name,
                                url:  repo_url,
                                issues: issues.map(_formatIssue)
                            }

                            issuesContainer.innerHTML += Handlebars.templates.issues(ctx);

                            evt.emit('issuesLoaded', { repo: name, issues: issues });
                        }
                    },
                    error: function(xhr, status, err){
                        conosle.error(status);
                        console.error(err);
                    }
                }
            ); // ajax

        }); // forEach
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
