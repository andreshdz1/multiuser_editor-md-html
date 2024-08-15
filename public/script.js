window.onload = function() {
    var conv = new showdown.Converter();
    var md  = document.getElementById('pad');
    var area = document.getElementById('preview');
    const connection = new WebSocket('ws://localhost:8000');
    //sharejs document
    const doc = connection.get('documents', 'markdownDoc');
    doc.subscribe((err) => {
        if (err) throw err;

        // Create the textarea and preview
        const md = document.getElementById('pad');
        const area = document.getElementById('preview');
        const conv = new showdown.Converter();

        // Initialize the textarea with the content of the ShareJS document
        md.value = doc.data || '';

        // Function to update the preview
        const updatePreview = () => {
            const markdownText = md.value;
            const html = conv.makeHtml(markdownText);
            area.innerHTML = html;
        };

        // Update the ShareJS document on input
        md.addEventListener('input', () => {
            doc.submitOp([{p: [], sd: doc.data}, {p: [], si: md.value}]);
            updatePreview();
        });

        // Update the preview and textarea when the document changes
        doc.on('op', () => {
            md.value = doc.data;
            updatePreview();
        });

        // Initial preview update
        updatePreview();
    });
};
