exports.handler = async (event) => {
    try {
        const jsonData = JSON.stringify(event.body);

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>State Machine Diagram</title>
                <link rel="stylesheet" type="text/css" href="style.css">
                <script src="https://cdn.jsdelivr.net/npm/@joint/core@4.0.1/dist/joint.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/dagre/0.8.5/dagre.min.js"></script>
            </head>
            <body>
                <div id="paper"></div>
                <div id="node-details"></div>
                <script type="module">
                    import { initializeGraph } from './modules/graphInit.js';
                    
                    const stateMachineData = ${jsonData};
                    initializeGraph(stateMachineData);
                </script>
            </body>
            </html>
            `;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: htmlContent,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
