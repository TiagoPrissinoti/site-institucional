import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, HeartHandshake, Mail, MapPin, Menu, MessageCircle, NotebookPen, Package, Phone, Shapes, ShoppingBag, X } from 'lucide-react'
import { retailFocus, company, companyName, whatsappUrl } from './config/company'

const missing = 'Não informado · configurar'
const navigation = [['Início', 'inicio'], ['Sobre nós', 'sobre'], ['Produtos', 'produtos'], ['Contato', 'contato']]

function Brand() {
  return <Link className="brand" to="/" aria-label={`${companyName} — início`}><span className="brand-icon"><ShoppingBag size={23} strokeWidth={1.6} /></span><span>{companyName}<small>COMÉRCIO VAREJISTA</small></span></Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  return <>
    <header className="header"><div className="container header-inner"><Brand /><nav aria-label="Navegação principal" className="navigation">{navigation.map(([label, id]) => <Link key={id} className={pathname === '/' && (hash === `#${id}` || (!hash && id === 'inicio')) ? 'active' : ''} to={`/#${id}`}>{label}</Link>)}</nav><Link className="button button-small header-contact" to="/#contato">Fale conosco <ArrowUpRight size={16} /></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-nav">{open ? <X /> : <Menu />}</button></div><nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel" hidden={!open}>{navigation.map(([label, id]) => <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16} /></Link>)}</nav></header>
  </>
}

function PageEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const title = pathname === '/politica-de-privacidade' ? 'Política de Privacidade' : pathname === '/termos-de-uso' ? 'Termos de Uso' : pathname === '/' ? 'Variedade para o seu dia a dia' : 'Página não encontrada'
    document.title = `${title} | ${companyName}`
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }))
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Home() {
  return <main id="conteudo">
    <section className="hero" id="inicio"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span /> O COTIDIANO TEM NOVAS POSSIBILIDADES</div><h1>Variedade para<br />a sua vida.<br /><span>Cuidado em<br className="desktop-break" /> cada detalhe.</span></h1><p>Comércio varejista em geral, com foco em papelaria e produtos de uso diário. Praticidade para estudar, trabalhar e cuidar da rotina.</p><div className="hero-actions"><a className="button" href="#produtos">Conheça nossa atuação <ArrowRight size={18} /></a><a className="text-link" href="#contato">Entre em contato <ArrowUpRight size={17} /></a></div><div className="hero-note"><span className="note-line" /> Para estudar, trabalhar e viver o dia a dia.</div></div><div className="hero-visual"><img src="/images/papelaria.svg" width="1400" height="1000" fetchPriority="high" alt="Ilustração de uma mesa com caderno, papéis e lápis" /><div className="image-label"><span /> INSPIRAÇÃO PARA O DIA A DIA</div><div className="photo-caption">Imagem ilustrativa. Não representa um estabelecimento da empresa.</div><div className="visual-card"><span className="visual-icon"><Shapes size={27} strokeWidth={1.4} /></span><div>Pequenos detalhes.<strong>Novas possibilidades.</strong></div><ArrowUpRight size={22} /></div><span className="hero-index">01 — BEM-VINDO</span></div></div><div className="container hero-bottom"><span>UM OLHAR PARA CADA NECESSIDADE</span><a href="#produtos">Explore o site <ArrowDown size={14} /></a></div></section>
    <div className="principles"><div className="container principles-grid"><div><Package /><span>Papelaria e uso diário<small>Produtos para acompanhar a rotina</small></span></div><div><HeartHandshake /><span>Contato direto<small>Uma conversa começa por aqui</small></span></div><div><ShoppingBag /><span>Comércio varejista<small>Conheça nossa apresentação institucional</small></span></div></div></div>
    <section className="section retail-section" id="produtos">
      <div className="container">
        <div className="section-heading">
          <div><span className="eyebrow">NOSSA ATUAÇÃO</span><h2>Praticidade para<br />o seu cotidiano.</h2></div>
          <p>Atuamos no comércio varejista em geral, com atenção à papelaria e aos produtos de uso diário.</p>
        </div>
        <div className="retail-grid">
          {retailFocus.map((focus, index) => <article className="retail-card" key={focus.id}>
            <span className="retail-icon">{index === 0 ? <NotebookPen size={30} /> : index === 1 ? <Package size={30} /> : <ShoppingBag size={30} />}</span>
            <h3>{focus.name}</h3><p>{focus.description}</p>
            <a className="text-link" href="#contato">Saiba mais <ArrowUpRight size={17} /></a>
          </article>)}
        </div>
        <p className="retail-note">Para informações sobre produtos e disponibilidade, consulte nossos canais de atendimento.</p>
      </div>
    </section>
    <section className="about section" id="sobre"><div className="container about-grid"><div className="about-visual"><img src="/images/papelaria.svg" loading="lazy" width="650" height="650" alt="Ilustração de artigos de papelaria e organização do dia a dia" /><span>O VALOR ESTÁ NOS DETALHES</span></div><div className="about-copy"><span className="eyebrow">SOBRE A EMPRESA</span><h2>Uma empresa.<br />Muitas possibilidades.</h2><p>{company.description || 'Este espaço será dedicado à apresentação real da empresa, à sua atuação no comércio varejista e aos produtos que fazem parte do seu negócio.'}</p><p>Conheça os dados institucionais e utilize nossos canais oficiais para conversar sobre produtos e atendimento.</p><dl className="company-details"><div><dt>Nome fantasia</dt><dd>{company.tradeName || missing}</dd></div><div><dt>Razão social</dt><dd>{company.legalName || missing}</dd></div><div><dt>Cidade / UF</dt><dd>{company.city && company.state ? `${company.city} / ${company.state}` : missing}</dd></div></dl><a href="#contato" className="text-link">Vamos conversar <ArrowUpRight size={18} /></a></div></div></section>
    <section className="contact section" id="contato"><div className="container"><div className="section-heading"><div><span className="eyebrow">ESTAMOS POR AQUI</span><h2>O próximo passo<br />é uma conversa.</h2></div><p>Para saber mais sobre a empresa e nossos produtos, entre em contato pelos canais oficiais.</p></div><div className="contact-grid"><div className="whatsapp-card"><span className="contact-icon"><MessageCircle size={30} strokeWidth={1.5} /></span><h3>Fale com a gente<br />pelo WhatsApp.</h3><p>Um canal direto para tirar dúvidas e solicitar informações.</p>{whatsappUrl ? <a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Iniciar conversa <ArrowUpRight size={18} /></a> : <><button className="button button-light" disabled>WhatsApp a configurar <MessageCircle size={18} /></button><small>O canal será ativado após a inclusão do número comercial.</small></>}</div><div className="contact-details"><ContactItem icon={<Phone />} label="Telefone comercial" value={company.phone} href={company.phone ? `tel:${company.phone.replace(/[^+\d]/g, '')}` : undefined} /><ContactItem icon={<Mail />} label="E-mail comercial" value={company.email} href={company.email ? `mailto:${company.email}` : undefined} /><ContactItem icon={<MapPin />} label="Endereço comercial" value={company.address ? `${company.address}${company.city ? ` — ${company.city}/${company.state}` : ''}` : ''} /><ContactItem icon={<Clock3 />} label="Horário de atendimento" value={company.businessHours} /></div></div></div></section>
  </main>
}

function ContactItem({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  return <div className="contact-item"><span>{icon}</span><div><h3>{label}</h3>{href ? <a href={href}>{value}</a> : <p className={!value ? 'unconfigured' : ''}>{value || missing}</p>}</div></div>
}

function LegalPage({ privacy }: { privacy: boolean }) {
  return <main id="conteudo" className="legal container"><Link className="text-link" to="/">← Voltar ao início</Link><span className="eyebrow">INFORMAÇÕES INSTITUCIONAIS</span><h1>{privacy ? 'Política de Privacidade' : 'Termos de Uso'}</h1><p>Responsável: {company.legalName || '[Razão social a configurar]'} · CNPJ: {company.cnpj || '[CNPJ a configurar]'}.</p>{privacy ? <>
    <h2>1. Navegação e dados pessoais</h2><p>Este site tem finalidade institucional. A aplicação não contém formulários de cadastro, contas de usuário, pagamentos ou ferramentas de análise de audiência. Não solicita nem armazena dados pessoais do visitante no navegador.</p>
    <h2>2. Contato e finalidades</h2><p>Ao optar por um contato por e-mail, telefone ou WhatsApp, você poderá fornecer dados como nome, contato e conteúdo da mensagem. Essas informações serão usadas para responder à sua solicitação e dar continuidade ao atendimento. Evite enviar informações sensíveis que não sejam necessárias para o atendimento.</p>
    <h2>3. Hospedagem e compartilhamento</h2><p>{company.hostingPrivacyNotice || 'A infraestrutura de hospedagem poderá processar endereço IP e informações técnicas das requisições para entregar as páginas e manter a segurança. Para esclarecimentos sobre o tratamento de dados durante a navegação, entre em contato pelo canal de privacidade abaixo.'}</p><p>O contato por serviços externos envolve os respectivos provedores. Para esclarecimentos sobre o tratamento de informações no atendimento, utilize nosso canal de privacidade.</p>
    <h2>4. Cookies e links externos</h2><p>Esta aplicação não instala cookies, não utiliza armazenamento local e não inclui rastreadores publicitários. As imagens são servidas pelo próprio site. Ao acessar um link para WhatsApp ou outro serviço externo, passam a valer as políticas desse serviço, que poderá utilizar cookies e tratar dados segundo suas próprias condições.</p>
    <h2>5. Seus direitos</h2><p>Conforme a LGPD e as condições aplicáveis, você pode solicitar confirmação e acesso aos dados, correção, anonimização, bloqueio ou eliminação de dados desnecessários ou irregulares, portabilidade, informações sobre compartilhamento e consentimento, além de sua revogação e da eliminação dos dados tratados com consentimento, ressalvadas as hipóteses legais de conservação. Também pode apresentar petição à autoridade nacional.</p><p>Consulte o <a href="https://normas.leg.br/?urn=urn:lex:br:federal:lei:2018-08-14;13709!art18" target="_blank" rel="noopener noreferrer">artigo 18 da Lei Geral de Proteção de Dados</a>.</p>
    <h2>6. Canal de privacidade</h2><p>Solicitações devem ser direcionadas a {company.email ? <a href={`mailto:${company.email}`}>{company.email}</a> : '[e-mail comercial a configurar]'}. Para proteger seus dados, poderão ser solicitadas informações necessárias para confirmar sua identidade ao atender um pedido.</p>
  </> : <>
    <h2>1. Finalidade do site</h2><p>O site apresenta informações institucionais e canais de contato da empresa. Não realiza vendas, pagamentos, reservas ou pedidos online.</p>
    <h2>2. Informações e produtos</h2><p>As informações publicadas têm caráter informativo. Imagens ilustrativas não representam necessariamente produtos disponíveis ou instalações da empresa. A apresentação das áreas de atuação não garante estoque ou disponibilidade de um item específico. Consulte a empresa para obter informações atualizadas.</p>
    <h2>3. Uso do conteúdo</h2><p>Textos, identidade visual e imagens estão sujeitos aos direitos dos respectivos titulares e às licenças aplicáveis. O acesso ao site não transfere direitos de propriedade intelectual. Utilize o conteúdo de maneira lícita e respeitando esses direitos.</p>
    <h2>4. Links externos</h2><p>Links de contato podem direcionar a serviços operados por terceiros, sujeitos às condições e políticas desses provedores. Verifique tais condições antes de compartilhar informações.</p>
    <h2>5. Disponibilidade e responsabilidade</h2><p>O conteúdo pode ser atualizado e o acesso pode sofrer interrupções técnicas. Estas condições não afastam direitos assegurados pela legislação brasileira nem excluem responsabilidades legalmente aplicáveis.</p>
    <h2>6. Contato</h2><p>Para dúvidas sobre o site, utilize {company.email ? <a href={`mailto:${company.email}`}>{company.email}</a> : '[e-mail comercial a configurar]'} ou consulte a <Link to="/#contato">seção de contato</Link>.</p>
  </>}<div className="legal-end">{privacy ? <Link to="/termos-de-uso">Leia também os Termos de Uso <ArrowRight size={17} /></Link> : <Link to="/politica-de-privacidade">Leia também a Política de Privacidade <ArrowRight size={17} /></Link>}</div></main>
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><div><Brand /><p>Variedade, qualidade e praticidade<br />para o seu dia a dia.</p></div><div className="footer-links"><span>EXPLORE</span>{navigation.map(([label, id]) => <Link key={id} to={`/#${id}`}>{label}</Link>)}</div><div className="footer-data"><span>INFORMAÇÕES DA EMPRESA</span><p>{company.legalName || '[Razão social a configurar]'}</p><p>CNPJ: {company.cnpj || '[A configurar]'}</p><p>{company.address || '[Endereço comercial a configurar]'}</p><p>{company.city && company.state ? `${company.city} / ${company.state}` : '[Cidade / UF a configurar]'}</p><p>{company.email || '[E-mail a configurar]'}</p><p>{company.phone || '[Telefone a configurar]'}</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {companyName}. Todos os direitos reservados.</span><div><Link to="/politica-de-privacidade">Política de Privacidade</Link><Link to="/termos-de-uso">Termos de Uso</Link></div></div></div></footer>
}

function App() {
  return <BrowserRouter><PageEffects /><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><Routes><Route path="/" element={<Home />} /><Route path="/politica-de-privacidade" element={<LegalPage privacy />} /><Route path="/termos-de-uso" element={<LegalPage privacy={false} />} /><Route path="*" element={<main id="conteudo" className="container legal"><h1>Página não encontrada</h1><p>O endereço solicitado não está disponível.</p><Link className="button" to="/">Voltar ao início <ArrowRight size={18} /></Link></main>} /></Routes><Footer /></BrowserRouter>
}

export default App
