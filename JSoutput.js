module.exports.JSoutput = function(a) {
    var str = "["
    if (typeof(a)=="object" && a.length) {
        for (var i=0; i < a.length; i++)
            if (typeof(a[i])=="object" && a[i].length) {
                str += (i==0?"":" ")+"["
                for (var j=0; j<a[i].length; j++)
                    str += a[i][j]+(j==a[i].length-1?
                            "]"+(i==a.length-1?"]":",")+"\n":", ");
            } else str += a[i]+(i==a.length-1?"]":", ");
    } else str = a;
    return str;
}
