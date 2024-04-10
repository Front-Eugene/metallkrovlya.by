window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
        var keyCode;
        function mask(event) {
          event.keyCode && (keyCode = event.keyCode);
          var pos = this.selectionStart;
          if (pos < 3) event.preventDefault();
          var matrix = "+375 (__) ___ - __ - __",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = this.value.replace(/\D/g, ""),
              new_value = matrix.replace(/[_\d]/g, function(a) {
                  return i < val.length ? val.charAt(i++) : a
              });
          i = new_value.indexOf("_");
          if (i != -1) {
              i < 5 && (i = 3);
              new_value = new_value.slice(0, i)
          }
          var reg = matrix.substr(0, this.value.length).replace(/_+/g,
              function(a) {
                  return "\\d{1," + a.length + "}"
              }).replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = new_value;
          }
          if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
          }
        }
    
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
    
    });


    const TOKEN = '7195270180:AAHRHTgMI77pAZG59Iw_6eRFfISkp4E68HM';
    const CHAT_ID = '-1002064961275';
    const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

    document.getElementById('contactForm').addEventListener('submit', function(e){
        e.preventDefault()

        let message = `<b>ЗАЯВКА С САЙТА</b>\n`;
        message += `<b>ИМЯ:</b> ${ this.name.value }\n`;
        message += `<b>ПЛОЩАДЬ:</b> ${ this.metr.value }\n`;
        message += `<b>ТЕЛЕФОН:</b> ${ this.phone.value }`;

        axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })

        .then(() => {
            this.name.value = ''
            this.metr.value = ''
            this.phone.value = ''
        })

        .catch((err) => {
            console.log(err);
        })

        .finally(() => {
            console.log('КОНЕЦ');
        })
    })

})


