<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\RequestNewPasswordController;
use App\Repository\LostPasswordRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LostPasswordRepository::class)]
#[ApiResource(normalizationContext: ["groups"=>["read"]],
    denormalizationContext: ["groups"=>["write"]],
    collectionOperations: [
        "post",
        "reset_password" => [
            "method"=> "POST",
            "path"=>"/users/reset-password",
            "controller"=>RequestNewPasswordController::class,]
        ])]
class LostPassword
{
    public function __construct()
    {
        $this->token = sha1(random_bytes(12));
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    #[ORM\Column(length: 255)]
    #[Groups("write")]
    private ?string $email = null;

    #[ORM\OneToOne(inversedBy: 'lostPassword', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
