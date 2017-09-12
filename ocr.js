$(function(){
    var file = $('#file'),
        result = $('#result');

    file.on('change', function(){
        var img_file_data = $(this)[0].files[0],
            fileReader = new FileReader();

        fileReader.readAsDataURL(img_file_data);
        fileReader.onload = function(event) {
            var image_src = event.target.result,
                image_obj = new Image(),
                image_el = document.getElementById('image'),
                context = image_el.getContext('2d'),
                dataURL, image_base64;

            //上传图片预览
            image_obj.src = image_src;
            image_obj.onload = function() {
                image_el.width = image_obj.width;
                image_el.height = image_obj.height;
                context.drawImage(image_obj, 0, 0);
            }

            //图片转为base64格式
            dataURL = image_el.toDataURL('image/png');
            image_base64 = dataURL.substring(dataURL.indexOf('4') + 2);
            // console.log(image_base64, dataURL);

            //发送至后端 获取识别结果
            $.ajax({
                type:'POST',
                url: 'http://127.0.0.1:8888/',
                data: {
                    image: image_base64,
                    id_card_side: 'front'
                },
                success: function(data) {
                    // console.log(data);
                    //显示识别结果
                    var el = '<ul>';

                    $.each(data.words_result, function(index) {
                        el += '<li>'+ index + ' : ' + data.words_result[index].words + '</li>';
                    });

                    el += '</ul>';
                    result.append($(el));
                },
                error: function(data) {
                    console.log('fail');
                },
            });
        };
    });
});

