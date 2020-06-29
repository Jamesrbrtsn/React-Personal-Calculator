
function isBalanced(str){
    let indexesFalse = [];
    let stack = [];
    for(let i = 0; i<str.length; i++){
        let temp = str.charAt(i);
        if(temp==="("){ stack.push(temp); indexesFalse.push(i);}
        else if(temp===")"){ stack.push(temp); indexesFalse.push(i);}
        // else if(temp==="["){ stack.push(temp); indexesFalse.push(i);}
        // else if(temp==="]"){ stack.push(temp); indexesFalse.push(i);}
        // else if(temp==="{"){ stack.push(temp); indexesFalse.push(i);}
        // else if(temp==="}"){ stack.push(temp); indexesFalse.push(i);}
    }
    return removeBrackets(stack,indexesFalse);
}

function removeBrackets(ar, indexes){
    
    let opposites = { "{":"}" }
    //     "(":")",    
    //     "[":"]"    
    // }
    
    let [result, indexJ] = recursionRemove(ar,indexes,opposites);

    let size = result.length;
    for(let h = 0; h<size; h++){
        if((h+2)<size){
          if(opposites[result[h]] === result[h+2]){
            result.splice(h,1);
          result.splice(h+1,1);	//updated, so +2 is now +1
          indexJ.splice(h,1);
          indexJ.splice(h+1,1);
          size = size-2;
          h--;
        }
      }
    }
    return indexJ;
}

function recursionRemove(arr,ind,oppos){
    let flag = 0;
    let a = [].concat(arr);
    let b = [].concat(ind);
    let size = a.length-1;
    for(let i = 0; i<size; i++){
        if(oppos[a[i]] === a[i+1]){
            a.splice(i,2);
            b.splice(i,2);
            flag++;
            size = size-2;
            i--;
        }
    }
    if(flag>0){ return recursionRemove(a, b, oppos);}
    else{ return [a,b] }
}

export default (input) => {
    let t = input;
    t = t.replace(/'/g,"");
    if(t.match(/\*(\*)+/g)!==null){t = t.replace(/\*(\*)+/g,"^");}
    if(t.match(/\+(\+)+/g)!==null){t = t.replace(/\+(\+)+/g,"+");}
    if(t.match(/-(-)+/g)!==null){t = t.replace(/-(-)+/g,"-");}
    if(t.match(/(\(|\))/g) !==null){ //clean any unclosed brackets
        let v = isBalanced(t);
        if(v.length>0){
            for(let i=v.length-1; i>=0; i--){
                if(v[i]<t.length-1){
                    let a = (t.substring(0,v[i])).concat(t.substring(v[i]+1,t.length));
                    t = a;
                }
                else{
                    let a = t.substring(0,v[i]);
                    t = a;
                }
            }
        }
    }
    if(t.match(/(?<=\d)\(/g) !=null){t = t.replace(/(?<=\d)\(/g,"*(");}
    if(t.match(/(?=\d)\)/g) !=null){t = t.replace(/(?=\d)\)/g,"*)");}
    return t;
}
