// JavaScript Document
	
	function getSenateStats() {
	var xhttp = new XMLHttpRequest();
	var parties = [];
	
	xhttp.onreadystatechange = function () {
		if(xhttp.readyState == 4 && xhttp.status == 200) {
		var statistics = JSON.parse(xhttp.responseText);
		var members = [statistics.results[0].members];
		var members = members[0];
		var republicans =  [];
		var repPartyVotes = null;
		var repPartyVotesTotal = null;
		var democrats =  [];
		var demPartyVotes = null;
		var demPartyVotesTotal = null;		
		var independents =  [];
		var indPartyVotes = null;
		var indPartyVotesTotal = null;
//		var editedMembers = [];
		var representatives = "";
		var	least_engaged_rows ="";
		var	most_engaged_rows ="";
		var	least_loyal_rows ="";
		var	most_loyal_rows ="";
		var names = [];		
		
		//Separate by Party
		for (i = 0; i < members.length; i++){
			if (members[i].party === "R"){
				republicans.push(members[i]);				
				}
				
			if (members[i].party === "D"){
				democrats.push(members[i]);
				}
				
			if (members[i].party === "I"){
				independents.push(members[i]);
				}
		} <!-- end party count -->
		
		//Get Party Vote Count
		for (i = 0; i < republicans.length; i++){
			repPartyPercent = republicans[i].votes_with_party_pct;
			repPartyVotes = Math.round((republicans[i].total_votes/100) * repPartyPercent);
			repPartyVotesTotal += repPartyVotes;	
				}
				
		for (i = 0; i < democrats.length; i++){
			demPartyPercent = democrats[i].votes_with_party_pct;
			demPartyVotes = Math.round((democrats[i].total_votes/100) * demPartyPercent);
			demPartyVotesTotal += demPartyVotes;	
				}
				
		for (i = 0; i < independents.length; i++){
			indPartyPercent = independents[i].votes_with_party_pct;
			indPartyVotes = Math.round((independents[i].total_votes/100) * indPartyPercent);
			indPartyVotesTotal += indPartyVotes;	
				}
		 <!-- end party vote count -->
		
		//Creates Least Engaged Table Row Loops
        if(document.getElementById('senate_least_engaged') != null){
		members.sort(function(a,b){return b.missed_votes_pct - a.missed_votes_pct;}); //Sorts from most to least missed votes
		for (i = 0; i < 10; i++){
			var member = [members[i]];
            var name = null;
                if (members[i].middle_name == null || "") {
                    name = members[i].first_name+ ' ' + members[i].last_name;
                }else{
                    name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
                    }
            var missedVotes = members[i].missed_votes;
            var missedVotePct = members[i].missed_votes_pct;  
			    representatives = {"Name":name, "Missed Votes":missedVotes, "Missed Votes Percentage":missedVotePct};
				least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Missed Votes"] +"</td><td>" + representatives["Missed Votes Percentage"] +"</td></tr>"
				least_engaged_rows = least_engaged_rows + least_engaged_row;				
		}		
		for (i = 0; i < members.length; i++){
		var tenPercentMissed = members[9].missed_votes_pct;
		var tenPercentMissedId = members[9].id;            
			if (members[i].missed_votes_pct == tenPercentMissed && members[i].id != tenPercentMissedId){
                var name = null;
                if (members[i].middle_name == null || "") {
                    name = members[i].first_name+ ' ' + members[i].last_name;
                }else{
                    name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
                    }
			    representatives = {"Name":name, "Missed Votes":missed_votes, "Missed Votes Percentage":missed_votes_pct};
				least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Missed Votes"] +"</td><td>" + representatives["Missed Votes Percentage"] +"</td></tr>"
				least_engaged_rows = least_engaged_rows + least_engaged_row;
			}
		}
        }
            
		//Creates most Engaged Table Row Loops 
        if(document.getElementById('senate_most_engaged') != null){            
		members.sort(function(a,b){return a.missed_votes - b.missed_votes;}); //Sorts from most to least made votes percentage          
		for (i = 0; i < 10; i++){     //loops through 10 highest voters by percent and creates rows
			var member = [members[i]];
            var name = null;
                if (members[i].middle_name == null || "") {
                    name = members[i].first_name+ ' ' + members[i].last_name;
                }else{
                    name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
                    }            
            var madeVotes = members[i].total_votes - members[i].missed_votes;
            var madeVotesPct = 100 - members[i].missed_votes_pct;            
			    representatives = {"Name":name, "Made Votes":madeVotes, "Made Votes Percentage":madeVotesPct};
				most_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Made Votes"] +"</td><td>" + representatives["Made Votes Percentage"] +"</td></tr>"
				most_engaged_rows = most_engaged_rows + most_engaged_row;				
		}

		for (i = 0; i < members.length; i++){     //checks the rest of members array for equal voting percentages and makes row
        var tenPercentMade = 100 - members[9].missed_votes_pct;
		var tenPercentMadeId = members[9].id;
			if ((100 - members[i].missed_votes_pct) == tenPercentMade && members[i].id != tenPercentMadeId){         
                var name = null;
                if (members[i].middle_name == null || "") {
                    name = members[i].first_name+ ' ' + members[i].last_name;
                }else{
                    name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
                    }
            var madeVotes = members[i].total_votes - members[i].missed_votes;
            var madeVotesPct = 100 - members[i].missed_votes_pct;            
			    representatives = {"Name":name, "Made Votes":madeVotes, "Made Votes Percentage":madeVotesPct};
				most_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Made Votes"] +"</td><td>" + representatives["Made Votes Percentage"] +"</td></tr>"
				most_engaged_rows = most_engaged_rows + most_engaged_row;
			}
		}
        }
            
		//Creates Least Loyal Table Row Loops 
        if(document.getElementById('senate_least_loyal') != null){
		members.sort(function(a,b){return a.votes_with_party_pct - b.votes_with_party_pct;}); //Sorts from least to most party votes
		for (i = 0; i < 10; i++){
			var named = names[i];
			var member = [members[i]];
            var name = null;
                if (members[i].middle_name == null || "") {
                    name = members[i].first_name+ ' ' + members[i].last_name;
                }else{
                    name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
                    }
            var partyLineVotes = Math.round((members[i].total_votes * members[i].votes_with_party_pct)/100);
            var partyLineVotePct = members[i].votes_with_party_pct;
			    representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
				least_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
				least_loyal_rows = least_loyal_rows + least_loyal_row;
		}		
		for (i = 0; i < members.length; i++){
		var tenPercentLeastLoyal = members[9].votes_with_party_pct;
		var tenPercentLeastLoyalId = members[9].id;            
			if (members[i].votes_with_party_pct == tenPercentLeastLoyal && members[i].id != tenPercentLeastLoyalId){
                var name = null;
                if (members[i].middle_name == null || "") {
                    name = members[i].first_name+ ' ' + members[i].last_name;
                }else{
                    name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
                    }
            var partyLineVotes = Math.round((members[i].total_votes * members[i].votes_with_party_pct)/100);
            var partyLineVotePct = members[i].votes_with_party_pct;
			    representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
				least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
				least_loyal_rows = least_loyal_rows + least_loyal_row;
			}
		}
        }
            
		//Creates Most Loyal Table Row Loops 
        if(document.getElementById('senate_most_loyal') != null){
		members.sort(function(a,b){return b.votes_with_party_pct - a.votes_with_party_pct;}); //Sorts from most to least party votes
		for (i = 0; i < 10; i++){
			var named = names[i];
			var member = [members[i]];
            var name = null;
                if (members[i].middle_name == null || "") {
                    name = members[i].first_name+ ' ' + members[i].last_name;
                }else{
                    name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
                    }
            var partyLineVotes = Math.round((members[i].total_votes * members[i].votes_with_party_pct)/100);
            var partyLineVotePct = members[i].votes_with_party_pct;
			    representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
				most_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
				most_loyal_rows = most_loyal_rows + most_loyal_row;
		}		
		for (i = 0; i < members.length; i++){
		var tenPercentLeastLoyal = members[9].votes_with_party_pct;
		var tenPercentLeastLoyalId = members[9].id;            
			if (members[i].votes_with_party_pct == tenPercentLeastLoyal && members[i].id != tenPercentLeastLoyalId){
                var name = null;
                if (members[i].middle_name == null || "") {
                    name = members[i].first_name+ ' ' + members[i].last_name;
                }else{
                    name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
                    }
            var partyLineVotes = Math.round((members[i].total_votes * members[i].votes_with_party_pct)/100);
            var partyLineVotePct = members[i].votes_with_party_pct;
			    representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
				most_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
				most_loyal_rows = most_loyal_rows + most_loyal_row;
			}
		}
        }   

		//JSON Objects
		var repStatistics = {"Number of Republicans":+republicans.length, "Party Votes":+repPartyVotesTotal};
		var demStatistics = {"Number of Democrats":+democrats.length, "Party Votes":+demPartyVotesTotal};
		var indStatistics = {"Number of Independents":+independents.length, "Party Votes":+indPartyVotesTotal};

		//Create Table Rows
		var senate_glance_rows = "<tr><td>Republicans</td><td>" + repStatistics["Number of Republicans"] +"</td><td>" + repStatistics["Party Votes"] +"</td></tr><tr><td>Democrats</td><td>" + demStatistics["Number of Democrats"] +"</td><td>" + demStatistics["Party Votes"] +"</td></tr><tr><td>Independents</td><td>" + indStatistics["Number of Independents"] +"</td><td>" + indStatistics["Party Votes"] +"</td></tr>";
				
		document.getElementById('senate_glance').innerHTML = "<table class=\"table\"><thead><tr><th>Party</th><th>Number of Senators</th><th>Party Line Votes</th></tr></thead><tbody>"+senate_glance_rows+"</tbody></table>";
            
		<!--Senate Least Loyal Table-->
        if(document.getElementById('senate_least_loyal') != null){
		  document.getElementById('senate_least_loyal').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Party Line Votes</th><th>Party Line %</th></tr></thead><tbody>"+least_loyal_rows+"</tbody></table>";
            }

		<!--Senate Most Loyal Table-->
        if(document.getElementById('senate_most_loyal') != null){
		  document.getElementById('senate_most_loyal').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Party Line Votes</th><th>Party Line %</th></tr></thead><tbody>"+most_loyal_rows+"</tbody></table>";
            }
            
		<!--Senate Least Engaged Table-->
        if(document.getElementById('senate_least_engaged') != null){
            document.getElementById('senate_least_engaged').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Number of Missed Votes</th><th>Percentage of Missed Votes</th></tr></thead><tbody>"+least_engaged_rows+"</tbody></table>";
            }
				
		<!--Senate Most Engaged Table-->
        if(document.getElementById('senate_most_engaged') != null){
            document.getElementById('senate_most_engaged').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Number of Votes Made</th><th>Percentage of Votes Made</th></tr></thead><tbody>"+most_engaged_rows+"</tbody></table>";
            }
		
		}<!--close xhttp if statement -->

	}<!-- onready state change-->

			xhttp.open('GET','pro-congress-113-senate.json', true);
			xhttp.send();
			
	}<!--end getSenateStats -->