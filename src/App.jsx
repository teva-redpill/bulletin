import { useMemo, useState } from 'react';

const bulletinsByCode = {
  '769313': {
    code: '769313',
    periodLabel: 'Période du 01/01/2026 au 31/01/2026',
    siret: '83442130700036',
    company: 'Redpill',
    employee: 'Teva CHOISNET',
    netBeforeTax: '7783.40',
    grossSalary: '9910',
  },
  '921204': {
    code: '921204',
    periodLabel: 'Période du 01/02/2026 au 28/02/2026',
    siret: '83442130700036',
    company: 'Redpill',
    employee: 'Teva CHOISNET',
    netBeforeTax: '7783.40',
    grossSalary: '9910',
  },
  '742460': {
    code: '742460',
    periodLabel: 'Période du 01/03/2026 au 31/03/2026',
    siret: '83442130700036',
    company: 'Redpill',
    employee: 'Teva CHOISNET',
    netBeforeTax: '7783.40',
    grossSalary: '9910',
  },
};

const initialCode = '';

function Logo() {
  return (
    <div className="logo-wrap">
      <div className="logo" aria-label="PayFit">
        <span className="logo-badge">P</span>
        <span>PayFit</span>
      </div>
    </div>
  );
}

function VerificationScreen({ code, onCodeChange, onSubmit, error, isValid }) {
  return (
    <section className="page">
      <div className="screen">
        <Logo />

        <div className="card">
          <p className="eyebrow">Bulletin de paie</p>
          <h1 className="title">Vérification d&apos;intégrité</h1>
          <p className="description">
            Entrez le code à 6 chiffres situé en-dessous du QR code sur le bulletin de paie.
          </p>

          <form onSubmit={onSubmit}>
            <input
              className="field"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={onCodeChange}
              placeholder="123456"
              aria-label="Code à 6 chiffres"
            />

            {error ? <p className="error-message">{error}</p> : null}

            <button className={`btn ${isValid ? 'btn-active' : ''}`} disabled={!isValid} type="submit">
              Valider
            </button>
          </form>
        </div>

        <p className="footer-note">
          Le scan du QR code vous permet de vérifier l’intégrité des informations présentes sur le bulletin de paie.
        </p>
        <a className="footer-link" href="https://payfit.com" target="_blank" rel="noreferrer">
          En savoir plus sur PayFit
        </a>
      </div>
    </section>
  );
}

function BulletinScreen({ bulletin, onBack }) {
  return (
    <section className="page">
      <div className="screen">
        <div className="top-actions">
          <button type="button" className="back-link" onClick={onBack}>
            ← Retour
          </button>
        </div>

        <div className="card">
          <p className="period">{bulletin.periodLabel}</p>
          <h2 className="title title-left-space">Informations du bulletin de paie</h2>

          <div className="alert">
            <div className="alert-icon">✓</div>
            <div className="alert-text">
              Comparez les données ci-dessous avec le bulletin de paie.
            </div>
          </div>

          <div className="info-list">
            <InfoRow label="SIRET" value={bulletin.siret} />
            <InfoRow label="Entreprise" value={bulletin.company} />
            <InfoRow label="Employé" value={bulletin.employee} />

            <div className="divider" />

            <InfoRow label="Net à payer avant impôt" value={bulletin.netBeforeTax} />
            <InfoRow label="Salaire brut" value={bulletin.grossSalary} />
          </div>
        </div>

        <p className="footer-note">
          Le scan du QR code vous permet de vérifier l’intégrité des informations présentes sur le bulletin de paie.
        </p>
        <a className="footer-link" href="https://payfit.com" target="_blank" rel="noreferrer">
          En savoir plus sur PayFit
        </a>
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="row">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

export default function App() {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState('');
  const [selectedBulletin, setSelectedBulletin] = useState(null);

  const isValid = useMemo(() => /^\d{6}$/.test(code), [code]);

  const handleCodeChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(numericValue);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(code)) {
      setError('Veuillez saisir un code à 6 chiffres.');
      return;
    }

    const bulletin = bulletinsByCode[code];

    if (!bulletin) {
      setError('Code introuvable. Essayez 123456, 654321 ou 111111 pour tester.');
      return;
    }

    setSelectedBulletin(bulletin);
  };

  const handleBack = () => {
    setSelectedBulletin(null);
    setError('');
  };

  if (selectedBulletin) {
    return <BulletinScreen bulletin={selectedBulletin} onBack={handleBack} />;
  }

  return (
    <VerificationScreen
      code={code}
      onCodeChange={handleCodeChange}
      onSubmit={handleSubmit}
      error={error}
      isValid={isValid}
    />
  );
}
