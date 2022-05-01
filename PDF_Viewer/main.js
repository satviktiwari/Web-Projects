const url = '../vk_qp_6.pdf';

let pdfdoc = null,
    pagenum = 1,
    pageisrendering = false,
    pagenumispending = null;

const scale = 1,
    canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');
    
// render page

const renderpage = num =>{
    pageisrendering = true;

    //get page
    pdfdoc.getPage(num).then(page => {
        //set scale
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderCtx = {
            canvasContext: ctx,
            viewport
        }
        page.render(renderCtx).promise.then(() => {
            pageisrendering = false;

            if(pagenumispending !== null) {
                renderpage(pagenumispending);
                pagenumispending = null;
            }
        });

        //output current page
        document.querySelector('#page-num').textContent = num;
    });
}
//check for pages rendering
const queueRenderPage = num => {
    if(pageisrendering) {
        pagenumispending = num;
    } else {
        renderpage(num);
    }
}

// show previous page
const showprevpage = () => {
    if(pagenum <= 1) {
        return;
    }
    pagenum--;
    queueRenderPage(pagenum);
}

// show next page
const shownextpage = () => {
    if(pagenum >= pdfdoc.numPages) {
        return;
    }
    pagenum++;
    queueRenderPage(pagenum);
}

// get doc
pdfjsLib.getDocument(url).promise.then(pdfdoc_ => {
    pdfdoc = pdfdoc_;
    document.querySelector('#page-count').textContent = pdfdoc.numPages;

    renderpage(pagenum);
})

.catch(err => {
    //display error
    const div = document.createElement('div');
    div.className = 'error';
    div.appendChild(document.createTextNode(err.message));
    document.querySelector('body').insertBefore(div, canvas);
    //remove top bar
    document.querySelector('.top-bar').style.display = 'none';
});

// btn events
document.querySelector('#prev-page').addEventListener('click', showprevpage);
document.querySelector('#next-page').addEventListener('click', shownextpage);