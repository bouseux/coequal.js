/*
	*coequal.js v 1.0.0 Beta
	*Author: Sudhanshu Yadav
	*s-yadav.github.com
	*Copyright (c) 2013 Sudhanshu Yadav.
	*Dual licensed under the MIT and GPL licenses
*/
	function coequal(data1, data2,option) {
	    option=option||{};
		var funCheck=option.functionCheck||'constructor',
			sortArray=option.sortArray||false,
			collCheck=option.collectionCheck||false;
		var getType = function (data) {
	        var type = Object.prototype.toString.call(data),
	        domIntrfc=['object HTML','object Node','object SVG','object Canvas'],
			re = new RegExp(domIntrfc.join("|"))
			if (data instanceof jQuery) {
	            type = 'jquery';
	        }
			else if(type.search(re)!=-1){
				type='dom';
				}
			return type; 
	    }
	    var data1Type = getType(data1),
	        data2Type = getType(data2);
	    if (data1Type != data2Type) return false;
	        if (data1Type == '[object Function]') {
	            if(funCheck=='code'){
					return data1.toString() == data2.toString();
					}
				else if (data1.constructor !== data2.constructor) return false;
	        } else if (data1Type == '[object Object]') {

	            for (var k in data1) {
	                if (!data1.hasOwnProperty(k)) continue;

	                if (!data2.hasOwnProperty(k)) return false;

	                return coequal(data1[k], data2[k]);

	            }
	            for (k in data2) {
	                if (data2.hasOwnProperty(k) && !data1.hasOwnProperty(k)) return false;
	            }
	        } else if (data1Type == '[object Array]') {
	            if (data1.length != data2.length) return false;

	                var cnt1 = 0,
	                    cnt2 = 0,
	                    checked = [];
	                for (var i = 0; i < data1.length; i++) {
						//if array element order matters
						if (!sortArray) {
							if (!coequal(data1[i], data2[i])) return false;
						}
						//if array element order not matters else {
	                    else{
						cnt1++;
	                    for (var j = 0; j < data2.length; j++) {
	                        if (checked.indexOf(j)!=-1) continue;
	                        if (coequal(data1[i], data2[j])) {
	                            cnt2++;
	                            checked.push(j);
	                        }
	                    }
	                    if (cnt1 != cnt2) return false;
						}
					}
	            }
	        else if(data1Type == '[object Date]'){
				return data1.getTime()==data1.getTime(); 
				}
			else if(data1Type=='[object RegExp]'){
				return data1.toString()==data2.toString();
				}
			else if(data1Type == 'jquery'){
				 coequal(data1.get(), data2[j].get());
				}
			else if(data1Type=='dom'){
				var collToArry=function(data){
					var ary=[];
					if(!data.length){
						ary.push(data);	
					}
					else{
						for(var i=0; i<data.length; i++){
							ary.push(data[i]);	
							}
						}
					return ary;	
					}
				if(collCheck){
					return coequal(collToArry(data1),collToArry(data2))
					}
				else{
					return data1===data2;
					}		
				}	
			else {return data1!==data2}
			return true;		
			}