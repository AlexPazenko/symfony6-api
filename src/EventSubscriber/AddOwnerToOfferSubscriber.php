<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use App\Entity\Offer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class AddOwnerToOfferSubscriber implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function addOwner(ViewEvent $event)
    {
        $offer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if (!$offer instanceof Offer || Request::METHOD_POST !== $method )
        {
            return;
        }

        $user = $this->security->getUser();
        $offer->setUser($user);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['addOwner', EventPriorities::PRE_WRITE],
        ];
    }
}
