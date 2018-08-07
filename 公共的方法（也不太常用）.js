//设置图片读取失败时默认图片
if(document.addEventListener){
    document.addEventListener("error", function (e) {
        var elem = e.target;
        if (elem.tagName.toLowerCase() == "img") {
            elem.src = "../../images/item-car.png";
        }
    }, true);
}else{//兼容ie
    document.attachEvent("error", function (e) {
        var elem = e.target;
        if (elem.tagName.toLowerCase() == "img") {
            elem.src = "../../images/item-car.png";
        }
    }, true);
};
//获取域名
if(typeof window.location.origin == 'undefined'){//兼容ie
    var baseUrl = window.location.protocol + '//' + location.host;
}else{
    var baseUrl = window.location.origin;
};

var clientCommon = {
    //验证手机号码
    isPhone:function(number){
        var reg = /^1[3-9][0-9]{9}$/;
        if(reg.test(number)){
            return true
        }else{
            return false
        }
    },
    //定时器
    timer:function (ele1,ele2) {
        var count = 59;
        ele1.text(count + 's');
        var timer = setInterval(function () {
            --count;
            ele1.text(count + 's');
            if(count===0){
                clearInterval(timer);
                ele1.hide();
                ele2.show()
            }
        },1000)
    },
    getSession:function(name) {
        var value = sessionStorage.getItem(name)
        if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
        return value
    },
    setSession:function (name, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value)
        return sessionStorage.setItem(name, value)
    },
    removeSession: function(name) {
        return sessionStorage.removeItem(name)
    },
    checkBackendData:function(res){
        if(typeof res != 'object') res = JSON.parse(res);
        if(res.code==1){
            return res.result
        }else{
            layer.msg(res.msg);
            return false
        }
    },
    //格式化时间
    handleDate:function (format, value) {
        if (!value || value=='--') return '--';
        var _type = format;
        var _date = new Date(value);
        switch(_type){
            case 'yyyy':
                return _date.getFullYear();
                break;
            case 'yyyy-MM':
                var month = (_date.getMonth() + 1) < 10? '0' + (_date.getMonth() + 1) : (_date.getMonth() + 1);
                return _date.getFullYear() + '-' + month;
                break;
            case 'yyyy-MM-dd':
                var month1 = (_date.getMonth() + 1) < 10? '0' + (_date.getMonth() + 1) : (_date.getMonth() + 1);
                var day = _date.getDate() < 10 ? '0' + (_date.getDate()) : _date.getDate();
                return _date.getFullYear() + '-' + month1 + '-' + day;
                break;
        }
    },
    //检查value
    checkValue:function (value) {
        if(value === undefined || value === ''){
            return '--'
        }else{
            return value
        }
    },
    // 获取地址栏参数
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    // 获取图片类型
    getImgType: function (type) {
        switch (type) {
            case 'vin':
            return 'VIN码'
            break;
            case 'right_rear':
            return '右后'
            break;
            case 'driving_seat':
            return '驾驶座椅'
            break;
            case 'control_booth':
            return '控制室'
            break;
            case 'odograph':
            return '里程表'
            break;
            case 'left_anterior':
            return '左前（首图'
            break;
            case 'open_trunk':
            return '打开后备箱'
            break;
            case 'engine_bay':
            return '发动机全景'
            break;
            case 'right_side':
            return '右侧'
            break;
            case 'tyre':
            return '轮胎'
            break;
            case 'insurance':
            return '保单'
            break;
            case 'registration_license':
            return '登记证'
            break;
            case 'vehicle_license':
            return '行驶证'
            break;
            default:
            return '变速档杆'

        }
    },
    // 判断亮点图片
    brightImg:function (tit) {
        switch(tit) {
            case '全景车窗':
            return '../../images/detail-tit1.png'
            break;
            case '真皮座椅':
            return '../../images/detail-tit4.png'
            break;
            case '座椅加热':
            return '../../images/detail-tit5.png'
            break;
            case 'GPS导航':
            return '../../images/detail-tit2.png'
            break;
            case '车身稳定控制':
            return '../../images/detail-tit6.png'
            break;
            case '无钥启动':
            return '../../images/detail-tit3.png'
            break;
            case '倒车雷达':
            return '../../images/detail-tit7.png'
            break;
            case '换挡拨片':
            return '../../images/detail-tit8.png'
            break;
            case '倒车影像':
            return '../../images/detail-tit9.png';
            break;
        }
    },
    // 判断车辆使用性质 1：营运、2：非营运、3营转非
    getCarPurpose: function (type) {
        switch (type) {
            case 1:
                return '营运'
                break;
            case 2:
                return '非营运'
                break;
            case 3:
                return '营转非'
                break;
            default:
                return ''

        }
    },
    //验证token的ajax请求
    ajax:function (url,param,callback) {
        $.ajax({
            url:url,
            type:'post',
            headers:{Authorization:clientCommon.getSession('Authorization'),source: 'pc_client'},
            data:param,
            dataType:'json',
            success:function(result,status,xhr){
                if (clientCommon.getSession('Authorization') != xhr.getResponseHeader('Authorization')) {//验证token
                    layer.msg('登录超时,请重新登录');
                    clientCommon.removeSession('_loginInfo');
                    clientCommon.removeSession('Authorization');
                    window.location.href = baseUrl + '/client-pc/html/index/index.html';
                    return false;
                }
                if(callback && typeof callback == 'function') callback(result,xhr);
            },
        })

    }
    

};