<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240528122124 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bills DROP FOREIGN KEY FK_22775DD09D86650F');
        $this->addSql('DROP INDEX IDX_22775DD09D86650F ON bills');
        $this->addSql('ALTER TABLE bills DROP user_id');
        $this->addSql('ALTER TABLE user ADD user_bills_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649CA31D3A4 FOREIGN KEY (user_bills_id) REFERENCES bills (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649CA31D3A4 ON user (user_bills_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649CA31D3A4');
        $this->addSql('DROP INDEX IDX_8D93D649CA31D3A4 ON user');
        $this->addSql('ALTER TABLE user DROP user_bills_id');
        $this->addSql('ALTER TABLE bills ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE bills ADD CONSTRAINT FK_22775DD09D86650F FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_22775DD09D86650F ON bills (user_id)');
    }
}
