<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BillsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BillsRepository::class)]
#[ApiResource]
class Bills
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $isPaid = null;

    #[ORM\Column(length: 12)]
    private ?string $paymentID = null;

    #[ORM\Column]
    private ?float $amount = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 16, nullable: true)]
    private ?string $creditCard = null;

    #[ORM\Column(length: 3, nullable: true)]
    private ?string $cryptogram = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $expirationDate = null;

    /**
     * @var Collection<int, User>
     */
    #[ORM\OneToMany(targetEntity: User::class, mappedBy: 'userBills')]
    private Collection $userID;

    public function __construct()
    {
        $this->userID = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isPaid(): ?bool
    {
        return $this->isPaid;
    }

    public function setPaid(bool $isPaid): static
    {
        $this->isPaid = $isPaid;

        return $this;
    }

    public function getPaymentID(): ?string
    {
        return $this->paymentID;
    }

    public function setPaymentID(string $paymentID): static
    {
        $this->paymentID = $paymentID;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCreditCard(): ?string
    {
        return $this->creditCard;
    }

    public function setCreditCard(?string $creditCard): static
    {
        $this->creditCard = $creditCard;

        return $this;
    }

    public function getCryptogram(): ?string
    {
        return $this->cryptogram;
    }

    public function setCryptogram(?string $cryptogram): static
    {
        $this->cryptogram = $cryptogram;

        return $this;
    }

    public function getExpirationDate(): ?\DateTimeInterface
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(?\DateTimeInterface $expirationDate): static
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUserID(): Collection
    {
        return $this->userID;
    }

    public function addUserID(User $userID): static
    {
        if (!$this->userID->contains($userID)) {
            $this->userID->add($userID);
            $userID->setUserBills($this);
        }

        return $this;
    }

    public function removeUserID(User $userID): static
    {
        if ($this->userID->removeElement($userID)) {
            // set the owning side to null (unless already changed)
            if ($userID->getUserBills() === $this) {
                $userID->setUserBills(null);
            }
        }

        return $this;
    }
}
