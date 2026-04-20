document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 1. LÓGICA DA PRELANDING (FUNIL DE QUALIFICAÇÃO)
    // =========================================================
    const funnelForm = document.getElementById('funnelForm');
    
    // O código abaixo só vai rodar se o usuário estiver na página prelanding.html
    if (funnelForm) {
        
        // Função para avançar entre as perguntas normais
        window.nextStep = function(nextStepNumber) {
            // Esconde todas as divs de passos
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active');
                step.style.display = 'none';
            });
            
            // Mostra a próxima div
            const nextStepEl = document.querySelector(`[data-step="${nextStepNumber}"]`);
            if (nextStepEl) {
                nextStepEl.classList.add('active');
                nextStepEl.style.display = 'block';
            }
        };

        // Função de Corte - Passo 5 (Investimento de R$ 98)
        window.checkBifurcationStep5 = function() {
            const escolha = document.querySelector('input[name="investimento"]:checked')?.value;
            
            // Validação: impede o usuário de avançar sem responder
            if (!escolha) {
                alert("Por favor, selecione uma opção para continuar sua análise.");
                return;
            }
            
            if (escolha === 'B') {
                showResult('result-corte'); // Opção Gratuita -> Bloqueia
            } else {
                nextStep(6); // Opção Paga -> Avança para a pergunta final
            }
        };

        // Função de Corte - Passo 6 (Prioridade / Antigo Passo 7)
        window.checkBifurcationStep6 = function() {
            const escolha = document.querySelector('input[name="prioridade"]:checked')?.value;
            
            // Validação: impede o usuário de avançar sem responder
            if (!escolha) {
                alert("Por favor, selecione uma opção para finalizar seu diagnóstico.");
                return;
            }
            
            if (escolha === 'B') {
                showResult('result-corte'); // Sem prioridade -> Bloqueia
            } else {
                // SUCESSO! O LEAD FOI QUALIFICADO.
                
                // (Opcional) Dispara o Pixel do Meta avisando que gerou um lead bom
                if(typeof fbq === 'function') {
                    fbq('track', 'Lead'); 
                }

                // Redireciona imediatamente para a Home (Página de Vendas/Agendamento)
                window.location.href = 'index.html'; 
            }
        };

        // Função para esconder o funil e mostrar o Card de Rejeição
        function showResult(resultId) {
            funnelForm.style.display = 'none'; // Some com as perguntas
            
            const resultDiv = document.getElementById(resultId);
            if (resultDiv) {
                resultDiv.classList.remove('hidden');
                resultDiv.classList.add('active');
                resultDiv.style.display = 'block';
            }
        }
    }


    // =========================================================
    // 2. LÓGICA DA HOME (index.html) - VÍDEOS DE DEPOIMENTO
    // =========================================================
    const videoGrid = document.querySelector('.testimonials-grid');
    
    // O código abaixo só vai rodar se o usuário estiver na Home
    if (videoGrid) {
        
        // IDs dos Shorts do YouTube que você me enviou
        const videos = [
            'Q6PhHWcCOAQ', // Depoimento 1
            'WVR99NWIlPk', // Depoimento 2
            'c7h0wAeBm6M'  // Depoimento 3
        ];

        // Cria os Iframes dinamicamente (Isso deixa o site muito mais rápido)
        let htmlVideos = '';
        videos.forEach(id => {
            htmlVideos += `
                <div class="video-card">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/${id}?rel=0" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;
        });
        
        // Insere os vídeos na página
        videoGrid.innerHTML = htmlVideos;
    }
});
