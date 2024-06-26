<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SignUpController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }
    public function __invoke(Request $request): Response
    {
        // Décode la requête.
        $requestContent = json_decode($request->getContent(), true);
        // Si les clés "email" et "password" ne sont pas présentent dans la
        // requête renvoie une erreur.
        if (
            !array_key_exists('email', $requestContent) ||
            !array_key_exists(
                'password',
                $requestContent
            )
        ) {
            $message = 'Un problème technique est survenu, veuillez réessayer ultérieurement.';
            return new Response($message, 500);
        }
        $userEmail = $requestContent['email'];
        $userFirstName = $requestContent['firstname'];
        $userLastName = $requestContent['lastname'];
        $userPassword = $requestContent['password'];
        $userAddress = $requestContent['address'];
        $userPhoneNumber = $requestContent['phoneNumber'];
        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);
        // Si l'utilisateur est déjà enregistré renvoie une erreur.
        if ($registeredUser) {
            return new Response('Adresse email déjà enregistrée', 409);
        }
        // Hash le mot de passe de l'utilisateur et l'enregistre.
        $newUser = new User();
        $newUser->setEmail($userEmail);
        $newUser->setFirstname($userFirstName);
        $newUser->setLastname($userLastName);
        $newUser->setPassword(
            $this->passwordHasher->hashPassword($newUser, $userPassword)
        );
        $newUser->setAddress($userAddress);
        $newUser->setPhoneNumber($userPhoneNumber);
        $newUser->setRoles(["ROLE_USER"]);
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();
        return new Response('OK', 200);
    }
}
