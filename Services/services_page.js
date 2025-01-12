document.querySelectorAll('.box_head').forEach(head => {
    head.addEventListener('click', () => {
        const content = head.nextElementSibling;
        if (content.style.height && content.style.height !== '0px') {
            content.style.height = '0';
            content.style.padding = '0';
        } else {
            content.style.height = content.scrollHeight + 'px';
            content.style.padding = '15px';
        }
    });
});
