/** Preencha somente com dados reais, autorizados pelo proprietário. */
export const company = {
  tradeName: 'MARLENE RIBEIRO ROSA',
  legalName: 'MARLENE RIBEIRO ROSA SIMARI',
  cnpj: '50.083.132/0001-00',
  email: 'marlenesimari@gmail.com',
  phone: '55 34991673758',
  whatsapp: '5534991673758', // 55 + DDD + número, somente dígitos.
  address: 'Avenida balaiadas,674',
  city: 'Uberlandia',
  state: 'MG',
  businessHours: '08:00 - 18:00',
  description: 'Somos uma empresa brasileira de comércio varejista em geral, com foco em produtos de papelaria e artigos de uso diário. Atuamos com produtos variados para acompanhar as necessidades do cotidiano.',
  siteUrl: '', // Origem HTTPS do domínio próprio.
  hostingPrivacyNotice: '', // Provedor, registros técnicos e retenção reais.
}

export const retailFocus = [
  { id: 'papelaria', name: 'Papelaria', description: 'Produtos de papelaria para acompanhar os estudos, o trabalho e a organização da rotina.' },
  { id: 'uso-diario', name: 'Uso diário', description: 'Artigos para as necessidades práticas do cotidiano, em casa e nas atividades do dia a dia.' },
  { id: 'varejo-geral', name: 'Comércio varejista em geral', description: 'Produtos variados em um só lugar. Fale conosco para conhecer os itens comercializados e consultar a disponibilidade.' },
]

export const companyName = company.tradeName || '[Nome da empresa]'
export const whatsappUrl = /^55\d{10,11}$/.test(company.whatsapp)
  ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de mais informações.')}`
  : undefined
