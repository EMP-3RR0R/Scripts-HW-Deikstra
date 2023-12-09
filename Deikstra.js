var file = WScript.StdIn.Readline();
var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile(file, 1);
var fc = f.ReadAll();
f.close();
fc = fc.replace(/\n/g, " ");
arr = fc.split(" ");
s = arr[0];
val = {};
for (var i = 1; i < arr.length; i+=2) val[arr[i]] = arr[i+1];
operators = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 3
}
s = s.replace(" ", "");
output = "";
var stack = "";
n = s.length;
flag = false;
for (var i = 0; i < n; i++)
{
  if (s.charAt(i)=="(")
  {
    stack = stack.concat(s.charAt(i));
    continue;
  }
  else if (s.charAt(i)==")")
  {
    if(stack.lastIndexOf("(") == -1)
    {
      WScript.echo("Incorrect parentheses");
      flag = true;
      break;
    }
    var del = stack.lastIndexOf("(");
    var now = stack.substr(del+1);
    stack = stack.substr(0, stack.length - now.length - 1);
    for (j = now.length; j >= 0; j--) output = output.concat(now.charAt(j));
    continue;
  }
  else if (s.charAt(i) in operators)
  {
    if ((stack.charAt(stack.length-1) in operators) && (operators[s.charAt(i)] < operators[stack.charAt(stack.length-1)]))
    {
      output = output.concat(stack.charAt(stack.length-1));
      stack = stack.substr(0, stack.length-1).concat(s.charAt(i));
    }
    else stack = stack.concat(s.charAt(i));
    continue;
  }
  else
  {
    output = output.concat(s.charAt(i))
    continue;
  }
}
if(!flag)
{
  for (var i = stack.length; i >= 0; i--) output = output.concat(stack.charAt(i));
  WScript.echo(output);
}

if (!flag)
{
  var dig = 0;
  var stack = [];
  var flag1 = false;
  for (var i = 0; i < output.length; i++)
  {
    if (flag1) break;
    if (output.charAt(i) in operators)
    {
      op = output.charAt(i);
      switch(op)
      {
        case "+":
        {
          var v = Number(stack[0]) + Number(stack[1]);
          stack.shift();
          stack[0] = v;
          break;
        }
        case "-":
        {
          var v = Number(stack[1]) - Number(stack[0]);
          stack.shift();
          stack[0] = v;
          break;
        }
       case "*":
       {
         var v = Number(stack[1]) * Number(stack[0]);
         stack.shift();
         stack[0] = v;
         break;
       }
      case "/":
      {
        if (Number(stack[1]) == 0)
        {
          flag1 = true;
          WScript.echo("Division by zero!!!");
          break;
        }
        var v = Number(stack[1]) / Number(stack[0]);
        stack.shift();
        stack[0] = v;
        break;
      }
      case "^":
      {
        var v = Math.pow(Number(stack[1]),Number(stack[0]));
        stack.shift();
        stack[0] = v;
        break;
      }
      }
    } 
      else stack.unshift(val[output.charAt(i)]);
    }
  if (!flag1) WScript.echo(stack[0]);
}