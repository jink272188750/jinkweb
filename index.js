(function(){
    var lock=true;//数据请求锁
    var lisHArr=[];//li高度数据
    var pageIndex=1;//请求页数
    init();   
    function init(){
        getData(); 
        window.onscroll=function(){
            if(isLoadData&&lock){
                lock=false;   
                getData();
            }
        }
    }
    /**
     * 获取数据
     */  
    
    function getData(){                     
            console.log("http://localhost/pubuliu/getPics.php?cpage="+pageIndex);  
            $.ajax({
                type:"GET",
                url:"http://localhost/pubuliu/getPics.php?cpage="+pageIndex,
                success:successCallback,
                error:errorCallback,
                beforeSend:beforeSendCallback
            })
            pageIndex++; 
    }
    /**
     * 插入图片
     */
    //记录list的高度
    
    function createDom(data){  
        $.each(data, function (index, value) { 
            var IDiv=$("<div><div>");
            var img=new Image();
            var title=$("<p></p>");
            console.log(value);
            title.text(value.title);
            img.src=value.preview;
            img.onload=function(){                
                IDiv.append(img).append(title);
                IDiv.addClass("Iitemdiv");
                if(lisHArr.length<$(".item").length){
                    console.log(index);
                    $(".item").eq(index).append(IDiv);  
                    lisHArr.push($(".item").height());
                 }else{
                    var minHight=Math.min.apply(null,lisHArr);
                    var minindex=lisHArr.indexOf(minHight);
                    $(".item").eq(minindex).append(IDiv);  
                    lisHArr[minindex]=$(".item").eq(minindex).height();
                 }         
            }
        });
    }

    function beforeSendCallback(){
       $(".load").show();
    }

    function successCallback(data){
        console.log(data);      
        var json= JSON.parse(data)     
        if(json.length==0){
            lock=false;
        }else{
            lock=true;
            createDom(json);        
        } 
        $(".load").hide();  
    }
    function errorCallback(code){
        console.log(code);   
    }

    function isLoadData(){
        var minHight=Math.min.apply(null,lisHArr);
        var wdHight=$(window).height();
        var scrollTop=$(window).scrollTop();
        return (scrollTop+wdHight)>minHight;
    }
})()