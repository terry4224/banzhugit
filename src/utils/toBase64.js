const getBase64 =(file)=> {
    return new Promise(function(resolve, reject) {
      let reader = new FileReader();
      let imgResult = "";
      reader.readAsDataURL(file.raw);
      reader.onload = function() {
        imgResult = reader.result;
      };
      reader.onerror = function(error) {
        reject(error);
      };
      reader.onloadend = function() {
      resolve(imgResult);
      };
    });
  }
  export {getBase64}