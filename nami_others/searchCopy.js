for(var a in spouse1) {
    for(var b in spouse2) {
        for(var c in key1snap.val().siblings) {
            usersRef.child(a).once("value").then(asnap => {
                usersRef.child(c).once("value").then(csnap => {
                    for(var d in asnap.val().siblings) {
                        for(var e in csnap.val().children) {
                            if(key2 == d || b == c || b == d) {
                                html_common +='<h6>3rd degree affinity</h6>';
                                $('#common_txt').html(html_common)
                            
                                html_common +='<h6>'+ key1snap.val().displayName +' is the sibling-in-law of '+ key2snap.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(key2 == e) {
                                html_common +='<h6>3rd degree consanguinity</h6>';
                                $('#common_txt').html(html_common)
                            
                                if(key1snap.val().gender == "male") {
                                    html_common +='<h6>'+ key1snap.val().displayName +' is the uncle of '+ key2snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else {
                                    html_common +='<h6>'+ key1snap.val().displayName +' is the aunt of '+ key2snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                }
                            } else if(b == e) {
                                html_common +='<h6>4th degree affinity</h6>';
                                $('#common_txt').html(html_common)
                            
                                if(key1snap.val().gender == "male") {
                                    html_common +='<h6>'+ key1snap.val().displayName +' is the uncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else {
                                    html_common +='<h6>'+ key1snap.val().displayName +' is the aunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                }
                            } else {
                                usersRef.child(d).once("value").then(dsnap => {
                                    for(var f in dsnap.val().children) {
                                        if(key2 == f || b == f) {
                                            html_common +='<h6>4th degree affinity</h6>';
                                            $('#common_txt').html(html_common)
                                        
                                            if(key1snap.val().gender == "male") {
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the uncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else {
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the aunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }
                })
            })
        }
    }
}

for(var a in spouse1) {
    for(var b in spouse2) {
        for(var c in key1snap.val().siblings) {
            usersRef.child(a).once("value").then(asnap => {
                usersRef.child(c).once("value").then(csnap => {
                    for(var d in asnap.val().siblings) {
                        if(b == c || b == d) {
                            html_common +='<h6>3rd degree affinity</h6>';
                            $('#common_txt').html(html_common)
                        
                            html_common +='<h6>'+ key1snap.val().displayName +' is the sibling-in-law of '+ key2snap.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        } else {
                            usersRef.child(c).once("value").then(csnap => {
                                usersRef.child(d).once("value").then(dsnap => {
                                    for(var e in csnap.val().children) {
                                        for(var f in dsnap.val().children) {
                                            if(key2 == e || key2 == f) {
                                                html_common +='<h6>3rd degree consanguinity</h6>';
                                                $('#common_txt').html(html_common)
    
                                                if(key1snap.val().gender == "male") {
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the uncle of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else {
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the aunt of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                }
                                            } else if(b == e || b == f) {
                                                html_common +='<h6>4th degree affinity</h6>';
                                                $('#common_txt').html(html_common)
    
                                                if(key1snap.val().gender == "male") {
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the uncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else {
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the aunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                }
                                            } else {
                                                usersRef.child(e).once("value").then(esnap => {
                                                    usersRef.child(f).once("value").then(fsnap => {
                                                        for(var g in esnap.val().children) {
                                                            for(var h in fsnap.val().children) {
                                                                if(key2 == g || key2 == h) {
                                                                    html_common +='<h6>4th degree consanguinity</h6>';
                                                                    $('#common_txt').html(html_common)
                                            
                                                                    if(key1snap.val().gender == "male") {
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else {
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    }
                                                                } else if(b == g || b == h) {
                                                                    html_common +='<h6>5th degree affinity</h6>';
                                                                    $('#common_txt').html(html_common)
                                            
                                                                    if(key1snap.val().gender == "male") {
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else {
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    }
                                                                } else {
                                                                    usersRef.child(g).once("value").then(gsnap => {
                                                                        usersRef.child(h).once("value").then(hsnap => {
                                                                            for(var i in gsnap.val().children) {
                                                                                for(var j in hsnap.val().children) {
                                                                                    if(key2 == i || key2 == j) {
                                                                                        html_common +='<h6>5th degree consanguinity</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                
                                                                                        if(key1snap.val().gender == "male") {
                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                        } else {
                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                        }
                                                                                    } else if(b == i || b == j) {
                                                                                        html_common +='<h6>6th degree affinity</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                
                                                                                        if(key1snap.val().gender == "male") {
                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                        } else {
                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                        }
                                                                                    } else {
                                                                                        usersRef.child(i).once("value").then(isnap => {
                                                                                            usersRef.child(j).once("value").then(jsnap => {
                                                                                                for(var k in isnap.val().children) {
                                                                                                    for(var l in jsnap.val().children) {
                                                                                                        if(key2 == k || key2 == l) {
                                                                                                            html_common +='<h6>6th degree consanguinity</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                    
                                                                                                            if(key1snap.val().gender == "male") {
                                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                                                                $('#common_txt').html(html_common)
                                                                                                            } else {
                                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                                                                $('#common_txt').html(html_common)
                                                                                                            }
                                                                                                        } else if(b == k || b == l) {
                                                                                                            html_common +='<h6>7th degree affinity</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                    
                                                                                                            if(key1snap.val().gender == "male") {
                                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                                $('#common_txt').html(html_common)
                                                                                                            } else {
                                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                                $('#common_txt').html(html_common)
                                                                                                            }
                                                                                                        } else {
                                                                                                            usersRef.child(k).once("value").then(ksnap => {
                                                                                                                usersRef.child(l).once("value").then(lsnap => {
                                                                                                                    for(var m in ksnap.val().children) {
                                                                                                                        for(var n in lsnap.val().children) {
                                                                                                                            if(key2 == m || key2 == n) {
                                                                                                                                html_common +='<h6>7th degree consanguinity</h6>';
                                                                                                                                $('#common_txt').html(html_common)
                                                                                                        
                                                                                                                                if(key1snap.val().gender == "male") {
                                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great great granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                                } else {
                                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great great grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                                }
                                                                                                                            } else if(b == m || b == n) {
                                                                                                                                html_common +='<h6>8th degree affinity</h6>';
                                                                                                                                $('#common_txt').html(html_common)
                                                                                                        
                                                                                                                                if(key1snap.val().gender == "male") {
                                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great great granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                                } else {
                                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great great grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                                }
                                                                                                                            } else {
                                                                                                                                usersRef.child(m).once("value").then(msnap => {
                                                                                                                                    usersRef.child(n).once("value").then(nsnap => {
                                                                                                                                        for(var o in msnap.val().children) {
                                                                                                                                            for(var p in nsnap.val().children) {
                                                                                                                                                if(key2 == o || key2 == p) {
                                                                                                                                                    html_common +='<h6>7th degree consanguinity</h6>';
                                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                            
                                                                                                                                                    if(key1snap.val().gender == "male") {
                                                                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                                        $('#common_txt').html(html_common)
                                                                                                                                                    } else {
                                                                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                                        $('#common_txt').html(html_common)
                                                                                                                                                    }
                                                                                                                                                } else if(b == o || b == p) {
                                                                                                                                                    html_common +='<h6>8th degree affinity</h6>';
                                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                            
                                                                                                                                                    if(key1snap.val().gender == "male") {
                                                                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                                        $('#common_txt').html(html_common)
                                                                                                                                                    } else {
                                                                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                                        $('#common_txt').html(html_common)
                                                                                                                                                    }
                                                                                                                                                } else {
                                                                                                                                                    usersRef.child(o).once("value").then(osnap => {
                                                                                                                                                        usersRef.child(p).once("value").then(psnap => {
                                                                                                                                                            for(var q in osnap.val().children) {
                                                                                                                                                                for(var r in psnap.val().children) {
                                                                                                                                                                    if(key2 == q || key2 == r) {
                                                                                                                                                                        html_common +='<h6>7th degree consanguinity</h6>';
                                                                                                                                                                        $('#common_txt').html(html_common)
                                                                                                                                                
                                                                                                                                                                        if(key1snap.val().gender == "male") {
                                                                                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great great great granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                                                                        } else {
                                                                                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great great great grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                                                                        }
                                                                                                                                                                    } else if(b == q || b == r) {
                                                                                                                                                                        html_common +='<h6>8th degree affinity</h6>';
                                                                                                                                                                        $('#common_txt').html(html_common)
                                                                                                                                                
                                                                                                                                                                        if(key1snap.val().gender == "male") {
                                                                                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great great great granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                                                                        } else {
                                                                                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great great great grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        })
                                                                                                                                                    })
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                })
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                })
                                                                                                            })
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        })
                                                                                    }
                                                                                }
                                                                            }
                                                                        })
                                                                    })
                                                                }
                                                            }
                                                        }
                                                    })
                                                })
                                            }
                                        }
                                    }
                                })
                            })
                        }
                    }
                })
            })
        }
    }
}