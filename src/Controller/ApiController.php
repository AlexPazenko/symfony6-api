<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ApiController extends AbstractController
{
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine)
    {
        $em = $doctrine->getManager();

        $email = $request->request->get('email');
        $password = $request->request->get('password');

        $user = new User($email);
        $user->setPassword($passwordHasher->hashPassword($user, $password));
        $user->setEmail($email);
        $em->persist($user);
        $em->flush();
        return new Response(sprintf('User %s successfully created', 'rrrttt'));
    }

    public function api()
    {
        return new Response(sprintf('Logged in as %s', $this->getUser()->getUsername()));
    }
}

