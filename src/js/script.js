window.addEventListener("DOMContentLoaded", function() {
    
    // МАСКА ТЕЛЕФОНА
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

    // МАСКА ТЕЛЕФОНА


    // ОТПРАВКА ФОРМЫ

    const TOKEN = '7195270180:AAHRHTgMI77pAZG59Iw_6eRFfISkp4E68HM';
    const CHAT_ID = '-1002064961275';
    const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
      
        // Get the values from the form fields
        const name = this.name.value.trim();
        const metr = this.metr.value.trim();
        const phone = this.phone.value.trim();
      
        // Validate the form fields
        if (name === '' || metr === '' || phone === '') {
          // Display an error message or perform any other necessary action
          alert('Пожалуйста заполните все поля.');
          return;
        }
      
        let message = `<b>ЗАЯВКА С САЙТА</b>\n`;
        message += `<b>ИМЯ:</b> ${name}\n`;
        message += `<b>ПЛОЩАДЬ:</b> ${metr}\n`;
        message += `<b>ТЕЛЕФОН:</b> ${phone}`;
      
        axios
          .post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
          })
          .then(() => {
            this.name.value = '';
            this.metr.value = '';
            this.phone.value = '';
            alert('Мы свяжемся с вами в жлизжайшее время.');
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            console.log('КОНЕЦ');
          });
      });

    // ОТПРАВКА ФОРМЫ


    // ПОЛУЧЕНИЕ КЛАССА КАРТЫ

    // Get all product cards
    const productCards = document.querySelectorAll('.card');

    // Get all buttons inside the product cards
    const buttons = document.querySelectorAll('.card .product-btn');

    // Get all close buttons inside the product cards
    const closeButtons = document.querySelectorAll('.card .close');

    const contactButtons = document.querySelectorAll('.card .close-card');

    // Add click event listeners to each button
    buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Add the "more" class to the corresponding product card
        productCards[index].classList.add('more');
        
        // Apply additional styles to the product card
        // Add your custom styles here
    });
    });

    // Add click event listeners to each close button
    closeButtons.forEach((closeButton, index) => {
    closeButton.addEventListener('click', () => {
        // Remove the "more" class from the corresponding product card
        productCards[index].classList.remove('more');
        
        // Remove any additional styles previously applied to the product card
        // Add your custom styles here
    });
    });

    // Add click event listeners to each close button
    contactButtons.forEach((contactButton, index) => {
      contactButton.addEventListener('click', () => {
          // Remove the "more" class from the corresponding product card
          productCards[index].classList.remove('more');
          
          // Remove any additional styles previously applied to the product card
          // Add your custom styles here
      });
      });

    // ПОЛУЧЕНИЕ КЛАССА КАРТЫ


    // АКТИВНЫЙ ДОБОРНЫЙ МАТЕРИАЛ

    const labels = document.querySelectorAll('.dop-material-items label');
    const images = document.querySelectorAll('.dop-material-img');

    labels.forEach((label, index) => {
      label.addEventListener('click', () => {
        // Hide all images
        images.forEach((image) => {
          image.style.display = 'none';
          image.style.zIndex = '-1';
        });

        // Show the corresponding image
          images[index].style.display = 'flex';
          images[index].style.zIndex = '1';
      });
    });

    // АКТИВНЫЙ ДОБОРНЫЙ МАТЕРИАЛ

})


