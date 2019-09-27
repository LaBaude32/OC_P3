class Diapo {

    switchDiapo() {
        let listImgs = document.querySelectorAll('img');

        for (const image of listImgs) {
            let val = image.getAttribute('class');
            if (val.includes('active')) {
                image.setAttribute('class', 'imgDiapo img-fluid');
                let valId = image.getAttribute('id');
                valId = valId.split('-');
                valId = valId[1];
                valId++;
                valId = 'slider-' + valId;
                if (valId == 'slider-5') {
                    valId = 'slider-0'
                }
                document.getElementById(valId).setAttribute('class', 'imgDiapo img-fluid active')
                break;
            }
        }
    }



}