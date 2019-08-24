// checks old's spouse's parent's sibling's children 4x
for(var b in parenta) {
    console.log("2 b")
    for(var c in spouse2) {
        usersRef.child(b).once("value").then(bsnap => {
            for(var d in bsnap.val().siblings) {
                usersRef.child(d).once("value").then(dsnap => {
                    for(var e in dsnap.val().children) {
                        if(e == key2 || e == c) {
                            html_common +='<h6>5th degree consanguinity</h6>';
                            $('#common_txt').html(html_common)
                
                            html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law of '+ key2snap.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        } else {
                            usersRef.child(e).once("value").then(esnap => {
                                for(var f in esnap.val().children) {
                                    if(f == key2 || f == c) {
                                        html_common +='<h6>6th degree consanguinity</h6>';
                                        $('#common_txt').html(html_common)
                            
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law once removed of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        usersRef.child(f).once("value").then(fsnap => {
                                            for(var g in fsnap.val().children) {
                                                if(g == key2 || g == c) {
                                                    html_common +='<h6>7th degree consanguinity</h6>';
                                                    $('#common_txt').html(html_common)
                                        
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law twice removed of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else {
                                                    usersRef.child(g).once("value").then(gsnap => {
                                                        for(var h in gsnap.val().children) {
                                                            if(h == key2 || h == c) {
                                                                html_common +='<h6>7th degree consanguinity</h6>';
                                                                $('#common_txt').html(html_common)
                                                    
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}

// checks old's parent's sibling's children 4x
for(var a in parent1) {
    for(var b in spouse2) {
        usersRef.child(a).once("value").then(asnap => {
            for(var c in asnap.val().siblings) {
                usersRef.child(c).once("value").then(csnap => {
                    for(var d in csnap.val().children) {
                        if(d == key2) {
                            html_common +='<h6>4th degree consanguinity</h6>';
                            $('#common_txt').html(html_common)
                
                            html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin of '+ key2snap.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        } else if(d == b) {
                            html_common +='<h6>5th degree consanguinity</h6>';
                            $('#common_txt').html(html_common)
                
                            html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law of '+ key2snap.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        } else {
                            usersRef.child(d).once("value").then(dsnap => {
                                for(var e in dsnap.val().children) {
                                    if(e == key2) {
                                        html_common +='<h6>4th degree consanguinity</h6>';
                                        $('#common_txt').html(html_common)
                            
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin once removed of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else if(e == b) {
                                        html_common +='<h6>5th degree consanguinity</h6>';
                                        $('#common_txt').html(html_common)
                            
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law once removed of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        usersRef.child(e).once("value").then(esnap => {
                                            for(var f in esnap.val().children) {
                                                if(f == key2) {
                                                    html_common +='<h6>4th degree consanguinity</h6>';
                                                    $('#common_txt').html(html_common)
                                        
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin twice removed of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else if(f == b) {
                                                    html_common +='<h6>5th degree consanguinity</h6>';
                                                    $('#common_txt').html(html_common)
                                        
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law twice removed of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else {
                                                    usersRef.child(f).once("value").then(fsnap => {
                                                        for(var g in fsnap.val().children) {
                                                            if(g == key2) {
                                                                html_common +='<h6>4th degree consanguinity</h6>';
                                                                $('#common_txt').html(html_common)
                                                    
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            } else if(g == b) {
                                                                html_common +='<h6>5th degree consanguinity</h6>';
                                                                $('#common_txt').html(html_common)
                                                    
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}