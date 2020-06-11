import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../core/config";
import Button from "../Button";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = () => (
  <div className="not-found-page">
    <h2 className="not-found-page__header">404</h2>
    <div className="not-found-page__ruler" />
    <div className="not-found-page__message">
      <p>Nie możemy znaleźć strony której szukasz! </p>
      <p>Być może pomyliłeś adres, bądź strona została przeniesiona. </p>
      <p>Przepraszamy za błąd i życzymy miłego dnia.</p>
    </div>
    <div className="not-found-page__button">
      <Link to={BASE_URL}>
        <Button dataCy="404pageGotoHomeButton" secondary>Powrót do strony głównej</Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
