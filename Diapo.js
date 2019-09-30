class Diapo {

    switchDiapo() {
        let diapoSelect = document.getElementById('tuto').childNodes;
        let listImgs = document.querySelectorAll('img');
        let lastImg = listImgs.lastElementChild;

        console.log(diapoSelect);

        console.log(listImgs);
        console.log(lastImg);


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
                    console.log(image);

                }


                document.getElementById(valId).setAttribute('class', 'imgDiapo img-fluid active')
                break;
            }
        }
    }



}