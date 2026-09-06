export type UpdatePostDetails = {
  category: string;
  publishedTime: string;
  context: string;
  metrics: Array<{ label: string; value: string }>;
  nextStep: string;
  reactions: number;
  comments: number;
  imageCaption?: string;
};

const updatePostDetails: Record<string, UpdatePostDetails> = {
  'update-school-1': {
    category: 'Diário da obra',
    publishedTime: '15:40',
    context:
      'Nos últimos quatro dias, 18 moradores participaram do nivelamento e da marcação da fundação. A equipe técnica refez uma das linhas de drenagem depois das chuvas e confirmou que a sala poderá receber até 46 crianças por turno. Todo o trabalho desta etapa foi realizado com mão de obra local contratada e mutirão das famílias.',
    metrics: [
      { value: '18', label: 'moradores no mutirão' },
      { value: '46', label: 'vagas por turno' },
      { value: '100%', label: 'terreno demarcado' },
    ],
    nextStep:
      'Comprar cimento e blocos com os três fornecedores cotados e iniciar a fundação na próxima semana.',
    reactions: 84,
    comments: 12,
    imageCaption:
      'Área da futura sala multiuso após a marcação da fundação. Registro enviado pela equipe de campo em 12 de agosto.',
  },
  'update-school-2': {
    category: 'Prestação de contas',
    publishedTime: '09:15',
    context:
      'Recebemos três cotações locais para blocos, cimento, ferragens e transporte. A comissão comunitária escolheu a proposta com menor custo total e entrega em duas etapas, evitando armazenar material exposto durante o período de chuvas. O primeiro pedido corresponde a 31% do orçamento previsto para materiais.',
    metrics: [
      { value: '3', label: 'fornecedores cotados' },
      { value: '31%', label: 'do orçamento reservado' },
      { value: '2', label: 'entregas programadas' },
    ],
    nextStep:
      'Confirmar o pagamento demonstrativo da primeira entrega e publicar o registro de recebimento dos materiais.',
    reactions: 61,
    comments: 8,
  },
  'update-oliveira-1': {
    category: 'Vida em campo',
    publishedTime: '18:20',
    context:
      'Os encontros passaram a acontecer em duas casas do bairro para reduzir o deslocamento das famílias. Neste primeiro mês, 27 adultos e 19 crianças participaram ao menos uma vez. As lideranças locais ajudaram a ajustar horários, linguagem e temas para a rotina da comunidade.',
    metrics: [
      { value: '46', label: 'participantes' },
      { value: '2', label: 'pontos de encontro' },
      { value: '4', label: 'lideranças envolvidas' },
    ],
    nextStep: 'Realizar visitas individuais e preparar o segundo ciclo de encontros para setembro.',
    reactions: 73,
    comments: 10,
    imageCaption: 'Caminho percorrido pela equipe nas visitas semanais em Huambo.',
  },
  'update-oliveira-2': {
    category: 'Formação local',
    publishedTime: '11:10',
    context:
      'A formação teve seis encontros práticos sobre escuta, proteção de crianças, facilitação de pequenos grupos e registro das atividades. Os quatro voluntários agora acompanham duplas de famílias e se reúnem quinzenalmente com a equipe para supervisão.',
    metrics: [
      { value: '4', label: 'voluntários formados' },
      { value: '6', label: 'encontros concluídos' },
      { value: '8', label: 'famílias acompanhadas' },
    ],
    nextStep: 'Avaliar o primeiro mês de acompanhamento e adaptar o material de supervisão.',
    reactions: 49,
    comments: 6,
  },
  'update-joao-1': {
    category: 'Planejamento',
    publishedTime: '16:35',
    context:
      'O encontro reuniu cinco educadores e duas lideranças comunitárias. O grupo definiu como prioridades a frequência das crianças, a participação das famílias e a preparação de materiais que possam ser produzidos localmente. Cada frente recebeu uma pessoa responsável e uma data de revisão.',
    metrics: [
      { value: '7', label: 'lideranças presentes' },
      { value: '3', label: 'prioridades definidas' },
      { value: '90 dias', label: 'ciclo de trabalho' },
    ],
    nextStep: 'Testar o novo roteiro com duas turmas e reunir as observações dos educadores.',
    reactions: 57,
    comments: 9,
  },
  'update-well-1': {
    category: 'Avanço técnico',
    publishedTime: '14:05',
    context:
      'Foram avaliados três pontos indicados pela comunidade. A leitura geofísica confirmou a melhor combinação de profundidade estimada, acesso para a perfuratriz e distância segura das áreas de descarte. O laudo recomenda perfuração inicial de 72 metros, com margem técnica até 95 metros.',
    metrics: [
      { value: '3', label: 'pontos analisados' },
      { value: '72 m', label: 'profundidade inicial' },
      { value: '320', label: 'pessoas beneficiadas' },
    ],
    nextStep: 'Contratar a perfuração e fazer a reunião pública de início da obra.',
    reactions: 96,
    comments: 14,
    imageCaption: 'Área aprovada no estudo do solo, sinalizada pela comissão comunitária.',
  },
  'update-well-2': {
    category: 'Gestão comunitária',
    publishedTime: '10:30',
    context:
      'Sete moradores foram escolhidos em assembleia para acompanhar a obra, organizar o acesso à água e manter um fundo comunitário de pequenos reparos. O grupo inclui representantes de três comunidades e terá prestação de contas mensal aberta.',
    metrics: [
      { value: '7', label: 'membros da comissão' },
      { value: '3', label: 'comunidades representadas' },
      { value: 'Mensal', label: 'prestação de contas' },
    ],
    nextStep: 'Concluir o treinamento de manutenção preventiva antes da chegada da perfuratriz.',
    reactions: 68,
    comments: 11,
  },
  'update-lucas-1': {
    category: 'Relato de campo',
    publishedTime: '19:05',
    context:
      'Foram 286 quilômetros percorridos em cinco dias. Em cada comunidade, a equipe ouviu as lideranças, revisou o calendário e identificou famílias que precisam de acompanhamento mais próximo. Duas visitas foram remarcadas por causa das estradas após a chuva.',
    metrics: [
      { value: '3', label: 'comunidades visitadas' },
      { value: '286 km', label: 'percorridos' },
      { value: '21', label: 'famílias ouvidas' },
    ],
    nextStep: 'Retornar às duas comunidades com materiais e encontros para as equipes locais.',
    reactions: 74,
    comments: 7,
  },
  'update-boat-1': {
    category: 'Logística',
    publishedTime: '13:25',
    context:
      'Agentes de seis comunidades mapearam os trechos, tempos de viagem, locais seguros de embarque e períodos de maior correnteza. O desenho inicial prevê duas rotas fixas e uma janela mensal reservada para ações de saúde e educação solicitadas pelas comunidades.',
    metrics: [
      { value: '6', label: 'comunidades no mapa' },
      { value: '2', label: 'rotas fixas' },
      { value: '14 h', label: 'de viagem por ciclo' },
    ],
    nextStep: 'Validar as especificações do motor e os itens obrigatórios de segurança.',
    reactions: 88,
    comments: 13,
    imageCaption: 'Trecho de uma das rotas priorizadas pelos agentes ribeirinhos.',
  },
  'update-sarah-1': {
    category: 'Educação',
    publishedTime: '17:45',
    context:
      'O grupo revisou 24 atividades e substituiu exemplos pouco familiares por situações do cotidiano local. As educadoras também gravaram a pronúncia de palavras-chave em nepalês para apoiar as próximas turmas e sugeriram uma sequência mais curta para encontros com famílias.',
    metrics: [
      { value: '24', label: 'atividades revisadas' },
      { value: '9', label: 'educadoras participantes' },
      { value: '6', label: 'módulos adaptados' },
    ],
    nextStep: 'Aplicar o material com uma turma-piloto e registrar o retorno das famílias.',
    reactions: 79,
    comments: 15,
    imageCaption: 'Região onde as educadoras se reúnem para a formação pedagógica.',
  },
  'update-sarah-2': {
    category: 'Nova turma',
    publishedTime: '08:50',
    context:
      'Doze educadoras de quatro vilarejos confirmaram presença no próximo ciclo. O calendário foi organizado em encontros quinzenais para respeitar o período de colheita e reduzir ausências. Duas participantes mais experientes atuarão como facilitadoras locais.',
    metrics: [
      { value: '12', label: 'educadoras confirmadas' },
      { value: '4', label: 'vilarejos' },
      { value: '2', label: 'facilitadoras locais' },
    ],
    nextStep: 'Entregar os kits de formação e realizar a primeira reunião com as facilitadoras.',
    reactions: 52,
    comments: 5,
  },
  'update-libraries-1': {
    category: 'Curadoria',
    publishedTime: '12:40',
    context:
      'A lista reúne literatura queniana, livros ilustrados bilíngues, referências escolares e títulos escolhidos por adolescentes. Antes da compra, três professores revisaram faixa etária, idioma e disponibilidade local para evitar custos de importação desnecessários.',
    metrics: [
      { value: '186', label: 'títulos selecionados' },
      { value: '3', label: 'idiomas presentes' },
      { value: '4', label: 'acervos planejados' },
    ],
    nextStep: 'Confirmar disponibilidade nas livrarias de Nakuru e fechar o primeiro lote.',
    reactions: 91,
    comments: 18,
    imageCaption: 'Seleção inicial usada na conversa com professores e jovens leitores.',
  },
  'update-libraries-2': {
    category: 'Parcerias locais',
    publishedTime: '15:10',
    context:
      'Os espaços escolhidos ficam próximos a escolas e já têm responsáveis pela abertura semanal. Cada parceiro assinou um plano simples de cuidado do acervo, registro de empréstimos e atividades de leitura. Dois locais precisarão de pequenos reparos antes da instalação.',
    metrics: [
      { value: '4', label: 'espaços confirmados' },
      { value: '11', label: 'voluntários locais' },
      { value: '2', label: 'reparos programados' },
    ],
    nextStep: 'Medir os espaços, encomendar as estantes e concluir os reparos prioritários.',
    reactions: 63,
    comments: 9,
  },
};

export function getUpdatePostDetails(updateId: string): UpdatePostDetails {
  return (
    updatePostDetails[updateId] ?? {
      category: 'Atualização de campo',
      publishedTime: '12:00',
      context:
        'A equipe registrou esta etapa para manter apoiadores e parceiros locais informados sobre decisões, aprendizados e próximos passos.',
      metrics: [
        { value: 'Em curso', label: 'etapa atual' },
        { value: 'Local', label: 'equipe responsável' },
        { value: 'Mensal', label: 'ritmo de atualização' },
      ],
      nextStep: 'Compartilhar um novo registro assim que esta etapa for concluída.',
      reactions: 0,
      comments: 0,
    }
  );
}
