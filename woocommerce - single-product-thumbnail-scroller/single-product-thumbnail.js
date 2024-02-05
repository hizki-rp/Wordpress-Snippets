/* scroll the images through images index*/
const updateCarousel = (selectedImgIndex, lastImgIndex) => {
    let indexOfImgToScroll = selectedImgIndex - 3;
    if (selectedImgIndex < 3 || lastImgIndex <= 3) indexOfImgToScroll = -1;
    else if (selectedImgIndex === lastImgIndex) indexOfImgToScroll = indexOfImgToScroll-1;
    
    document.querySelectorAll(".flex-control-thumbs li").forEach((li, i) => {
        if (i <= indexOfImgToScroll) li.style.marginTop= '-150px';
        else li.style.marginTop ='0';
        li.style.transition = 'all 0.4s linear';
    });
};

/* Mutation observer is used to keep the record of active images and change the image accordingly*/
document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutationRecord) => {
                if (mutationRecord.target.className === "flex-active") {
                    const allElements = mutationRecord.target.parentNode.parentNode.children;
                    const targetedElement = mutationRecord.target.parentNode;
                    const indexOfTargetedElement = Array.from(allElements).indexOf(targetedElement);
                    const lastElementIndex = document.querySelectorAll(".flex-control-thumbs li").length - 1;
                    
                    updateCarousel(indexOfTargetedElement, lastElementIndex);
                }
            });
        });

        document.querySelectorAll(".flex-control-thumbs li img").forEach((img, i) => {
            observer.observe(img, {
                attributes: true,
                attributeFilter: ['style', 'class'],
            });
        });
    }, 0);
});