$("input[type=text]").focus();
var is_digit = false; <!--tells me if it is something written in text box-->
var is_dot = false; <!--tells me if I pressed . button already-->
var sign_pressed = true; <!--tells me if I already pressed an operation sign-->
var egal = false; <!--tells me if equal button was pressed-->
var rezult = 0; <!--keeps the result of the entire ecuation-->
var last_operation = "";
var memory = 0;
var memory_used = false;
var value = ""; <!--keeps the datas to apear on the screen-->
var tastatura = false; <!--tells me when to erase what's written in the input textbox-->
    
    function insert_new(x)
    {
        value=x;
        $("input[type=text]").val(value);
        if (last_operation==="") $(".ecuatie").html("");
        tastatura=false;
    }
    
    function insert_next(x)
    {
        value=value+x;
        $("input[type=text]").val(value);
    }
    
    function insert(x)
    {
        sign_pressed=false;
        if (!is_digit) {
            insert_new(x);
            is_digit=true;
        }
        else if (value!="0") insert_next(x);
    }
    
    function dot(x)
    {
        if (is_digit)
            if (!is_dot)
            {
                value=value+".";
                $("input[type=text]").val(value);
                is_dot=true;
            }
    }
    
    function operation(x)
    {
        if (!sign_pressed)
        {
            tastatura=true;
            is_digit=false;
            is_dot=false;
            sign_pressed=true;
            
            if (egal===true)
            {
                $(".ecuatie").html(value);
                egal=false;
            }
            else $(".ecuatie").append(value);
            <!--adds numbers I pressed to the ecuation div-->
            
            tastatura=true;<!--tells me that if something is pressed from keyboard, first the screen must be cleared-->
            
            if (last_operation==="+") rezult+=parseFloat(value);
                else if (last_operation==="-") rezult-=parseFloat(value);
                    else if (last_operation==="*") rezult*=parseFloat(value);
                        else if (last_operation==="/") 
                            {
                                if (parseFloat(value)!=0) rezult/= parseFloat(value);
                                    else alert("ERROR: Cannot divide by 0");
                            }
                            else rezult=parseFloat(value);
            
            $("input[type=text]").val(rezult);
            value=rezult;
            
            if (x==="="&&!egal) 
            {
                last_operation="";
                egal=true;
                sign_pressed=false;
                $(".ecuatie").append(x+rezult);
                $(".history").append($(".ecuatie").html()+'<br>');
            }<!--If = is pressed and it wasn't already, add = to ecuation div and register to histroy log-->
            else
            {
                last_operation=x;
                if (!egal) $(".ecuatie").append(x);
                egal=false;
                
            }
                    
        }
        else
        {
            if (x!="=")
            {
                last_operation=x;
                var text="";
                var text=$(".ecuatie").html();
                if (text.charAt(text.length-1)!="%") text=text.substring(0,text.length-1);
                text=text+last_operation;
                $(".ecuatie").html(text);
            }
        }<!--If a operation sign is pressed, it allows me to change it with another one-->
         
    }
    
    function memory_recall()
    {
        if (memory_used)
             value=$("input[type=text]").val(memory);
    }
    
    function memory_add()
    {
        memory_used=true;
        memory+=parseFloat(value);
        is_digit=false;
        $(".memory").html("M");
        
    }
    
    function memory_clear()
    {
        memory_used=false;
        memory=0;
        $(".memory").html("");
       
    }
    
    function memory_substract()
    {
        memory_used=true;
        memory-=parseFloat(value);
        is_digit=false;
         $(".memory").html("M");
    }
    
    function clear()
    {
        value=0;
        $("input[type=text]").val("")
        $(".ecuatie").html("");
    }
    
    function minus()
    {
        value*=-1;
        $("input[type=text]").val(value);  
    }
    
    function percent(x)
    {
        if(is_digit&&last_operation)
        {
           $("input[type=text]").val((parseFloat(value)/100)*rezult);
           value=(parseFloat(value)/100)*rezult;
           operation(x);
        }
    }

     $("input[type=button]").on("click", function(){
            if ($(this).val()>="0" && $(this).val()<="9") insert($(this).val());
            else if($(this).val()===".") dot();
            else if($(this).val()==="*") operation($(this).val());
            else if($(this).val()==="/") operation($(this).val());
            else if($(this).val()==="-") operation($(this).val());
            else if($(this).val()==="+") operation($(this).val());
            else if($(this).val()==="=") operation($(this).val());
            else if($(this).val()==="%") percent($(this).val());
            else if($(this).val()==="+/-") minus();
            else if($(this).val()==="MC") memory_clear();
            else if($(this).val()==="M+") memory_add();
            else if($(this).val()==="M-") memory_substract();
            else if($(this).val()==="MR") memory_recall();
            else if($(this).val()==="C") clear();
            $("input[type=text]").focus();
            });

    $(function() 
      {
            $("input[type=text]").focus();
            $("input[type=text]").on("keyup keydown", function(event) {
                
                if (tastatura)
                {
                    $("input[type=text]").val("");
                    tastatura=false;   
                }
              
                this.value = this.value.replace(/[^0-9\*+-/%=]/g,'');
                
                sign_pressed=false;
                is_digit=true;
                
                value=$("input[type=text]").val();
                var lastChar = value.charAt(value.length-1);
               
                console.log(lastChar);
                
                 if(lastChar==="*")
                {
                  
                    if (value==='+') value=rezult;
                    else value=value.substring(0,value.length-1);
                    operation(lastChar);
                    tastatura=true;
                    
                }
                else if(lastChar==="/")
                {
                    if (value==='+') value=rezult;
                    else value=value.substring(0,value.length-1);
                    operation(lastChar);
                    tastatura=true;
                }
                else if(lastChar==="-")
                {
                    if (value==='+') value=rezult;
                    else value=value.substring(0,value.length-1);
                    operation(lastChar);
                    tastatura=true;
                   
                }
                else if(lastChar==="+")
                {
                    if (value==='+') value=rezult;
                    else value=value.substring(0,value.length-1);
                    operation(lastChar);
                    tastatura=true;
                }
                 else if(lastChar==="=")
                {
                    value=value.substring(0,value.length-1);
                    operation(lastChar);
                    tastatura=true;
                }
                else if(lastChar==="%") 
                {
                    value=value.substring(0,value.length-1);
                    percent(lastChar);
                    tastatura=true;
                 
                }   
                else if(lastChar==="c") 
                {
                    value=value.substring(0,value.length-1);
                    clear();
                    tastatura=true;
    
                }  
            });
    });