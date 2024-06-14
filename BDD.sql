
CREATE TABLE Bills
(
  id              INT         NOT NULL AUTO_INCREMENT,
  user_id         INT         NOT NULL,
  isPaid          BOOLEAN     NOT NULL,
  payment_id      VARCHAR(12) NOT NULL,
  amount          FLOAT       NOT NULL,
  description     TEXT        NOT NULL,
  credit_card     VARCHAR(16) NULL    ,
  cryptogram      VARCHAR(3)  NULL    ,
  expiration_date DATE        NULL    ,
  PRIMARY KEY (id)
);

ALTER TABLE Bills
  ADD CONSTRAINT UQ_id UNIQUE (id);

ALTER TABLE Bills
  ADD CONSTRAINT UQ_payment_id UNIQUE (payment_id);

ALTER TABLE Bills
  ADD CONSTRAINT UQ_credit_card UNIQUE (credit_card);

CREATE TABLE User
(
  id           INT          NOT NULL AUTO_INCREMENT,
  firstname    VARCHAR(50)  NOT NULL,
  lastname     VARCHAR(50)  NOT NULL,
  email        VARCHAR(250) NOT NULL,
  phone_number VARCHAR(10)  NOT NULL,
  address      VARCHAR(250) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE User
  ADD CONSTRAINT UQ_id UNIQUE (id);

ALTER TABLE User
  ADD CONSTRAINT UQ_email UNIQUE (email);

ALTER TABLE User
  ADD CONSTRAINT UQ_phone_number UNIQUE (phone_number);

ALTER TABLE Bills
  ADD CONSTRAINT FK_User_TO_Bills
    FOREIGN KEY (user_id)
    REFERENCES User (id);
